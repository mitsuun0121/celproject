<template>
  <div class="container">
    <mv />
    <div class="section">
      <step01 />
      <div class="contact-outer">
        <div class="contact-inner">
          <p class="contact-number">STEP 01</p>
          <p class="contact-text">カウンセリング希望日時を選択してください。</p>
        </div>
      </div>
      <div class="contact-table__outer">
        <table class="contact-table">
          <tr>
            <td class="contact-date1">日時</td> <!-- 曜日を表示するヘッダーセル -->
            <td class="contact-date2" v-for="(date, dateIndex) in dates" :key="dateIndex" >
               {{ getDayOfWeek(date) }}
            </td>
          </tr>
        
          <tr v-for="(timeSlot, timeIndex) in timeSlots" :key="timeIndex">
            <td class="contact-time1">{{ timeSlot }}</td> <!-- 時間帯を表示 -->
            <td class="contact-time2" v-for="(date, dateIndex) in dates" :key="dateIndex" >
              
              <!-- 予約ボタンを表示 -->
              <button class="select-btn" @click="reservationClick(date, timeSlot)" :disabled="isReserved(date, timeSlot)" :class="{ 'clicked-button': isReserved(date, timeSlot) }" :id="date + '_' + timeSlot"><span v-if="!isReserved(date, timeSlot)">〇</span><span v-else>✕</span></button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import mv from '~/components/guests/mv.vue'
import step01 from '~/components/guests/step01.vue'
import LinkButton from '~/components/LinkButton.vue'
import { mapState } from 'vuex'

export default {
  layout: 'default',
  components: {
    mv,
    step01,
    LinkButton
    
  },
  data() {
    return {
      shiftData: {
        date: '',       // 日付を追加
        startTime: '',  // 開始時間を追加
        endTime: ''     // 終了時間を追加
      },
      shiftToUpdate: {
        id: '',
        date: '',
        startTime: '',
        endTime: ''
      },
      buttonStatusCache: {},
     
      shiftList: [],
      customerData: [],
      previousShiftList: [], // 前回のシフト一覧を保持するための変数

      startDate: new Date(), // 開始日を設定
      numDays: 7, // 表示する日数
      timeSlots: ['10:00', '11:00', '12:00', '13:00','14:00', '15:00', '16:00', '17:00',], // 時間帯のリスト

    };
  },
  created() {
    this.fetchCustomerData(() => {
      this.updateButtonStatus();
    });
  },
  computed: {
    dates() {
      // 開始日から指定した日数分の日にちを計算
      const dates = [];
      for (let i = 0; i < this.numDays; i++) {
        const currentDate = new Date(this.startDate);
        currentDate.setDate(this.startDate.getDate() + i);
        dates.push(currentDate.toLocaleDateString());
      }
      return dates;
    },
    ...mapState(['reservationData']), // "reservation" はストアモジュールの名前
  },

  mounted() {
    this.fetchShiftList(); // すべてカウンセラーのシフトデータを取得
    this.fetchCustomerData();
  },
  watch: {
    // ウォッチャーをここに追加
    startDate(newDate, oldDate) {
      if (newDate !== oldDate) {
        this.fetchShiftList();
        this.fetchCustomerData();
      }
    },
  },
  methods: {
    getDayOfWeek(date) {
      // 日にちに対応する曜日を計算
      const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
      const currentDate = new Date(date.replace(/\//g, '-'));
      const dayIndex = currentDate.getDay();
      const month = currentDate.getMonth() + 1; // 月は0から始まるため+1する
      const day = currentDate.getDate();
      return `${month}月${day}日（${dayOfWeek[dayIndex]}）`;
    },

    reservationClick(date, timeSlot) {
      if (!this.isReserved(date, timeSlot)) {
        // 予約がない場合、予約を行う処理を実行する
        // ここで実際の予約処理を行うか、予約データを更新するロジックを追加してください

        // 予約成功の場合、✕にボタンを切り替えることができます
        this.$set(this.customerData, `${date}-${timeSlot}`, true);
        // ユーザーが選択した日時データをオブジェクトとしてまとめる
        const reservationData = {
          date: date,
          timeSlot: timeSlot,
        };

        // reservationDataをストアに保存
        this.$store.dispatch('saveReservationData', reservationData);
        // inputページに遷移
        this.$router.push({ path: '/guests/input', query: { date: date, timeSlot: timeSlot } });
      }
    },

    // シフトデータを取得する関数
    async fetchShiftList() {
      try {
        // 前回のデータをコピー
        this.previousShiftList = [...this.shiftList];

        const response = await this.$axios.get('http://localhost/api/all_shifts');
        if (response && response.data && Array.isArray(response.data)) {
          this.shiftList = response.data.map(shift => ({
            id: shift.id,
            date: shift.shift_date ? shift.shift_date.split(' ')[0] : '日付なし', // 日付を"YYYY-MM-DD"形式に整形
            startTime: shift.start_time ? shift.start_time.slice(0, 5) : '00:00', // 時間を"HH:MM"形式に整形
            endTime: shift.end_time ? shift.end_time.slice(0, 5) : '00:00', // 時間を"HH:MM"形式に整形
          }));

          if (!this.isShiftListEqual(this.shiftList, this.previousShiftList)) {
            // シフト情報が変更された場合の処理を記述
           
          }

          // シフト情報をもとに予約情報を設定
          this.setReservations(this.shiftList);

        }
      } catch (error) {
        console.error('一覧の取得に失敗しました。', error);
      }
    },

    setReservations(shiftList) {
      this.reservations = {}; // シフト情報を初期化

      // シフト情報を設定
      shiftList.forEach(shift => {
        const date = shift.date;
        const startTime = shift.startTime;
        const endTime = shift.endTime;

        if (!this.reservations[date]) {
          this.reservations[date] = {};
        }

        // 対応する時間帯にシフト情報を設定
        for (let time = startTime; time < endTime; time = this.getNextTimeSlot(time)) {
          this.reservations[date][time] = true;
        }
      });
      
    },

    getNextTimeSlot(time) {
      // 次の時間帯を計算するヘルパーメソッド
      // 例: '10:00' -> '11:00'
      const [hours, minutes] = time.split(':');
      const nextHours = parseInt(hours, 10) + 1;
      return `${nextHours.toString().padStart(2, '0')}:${minutes}`;
    },

    isReserved(date, timeSlot) {
      const formattedDate = date.replace(/\//g, '-'); // 例: "2023/10/22" -> "2023-10-22"
      const formattedTimeSlot = `${timeSlot}`;
      
      const isReserved = !this.shiftList.some((shift) => {
        const shiftDate = shift.date;
        const shiftStartTime = shift.startTime.slice(0, 5); // フォーマットを整えて HH:MM 形式に
        const shiftEndTime = shift.endTime.slice(0, 5); // フォーマットを整えて HH:MM 形式に

        
        // 整形後のフォーマットで比較
        const result = shiftDate === formattedDate && shiftStartTime <= formattedTimeSlot && shiftEndTime >= formattedTimeSlot;

        
        return result;
      });
      
      return isReserved;
    },

    // バックエンドからお客さんのデータを取得
    async fetchCustomerData(callback) {
      try {
        const response = await this.$axios.get('http://localhost/api/guest');
      
        if (response && response.data) {
          // バックエンドから取得したデータをフィルタリング
          
          this.customerData = response.data.map(item => ({
            date: item.date.replace(/-/g, '/'),
            timeSlot: item.timeSlot.substring(0, 5),
          }));

          // コールバック関数を実行
          if (typeof callback === 'function') {
            callback();
          }
          // データベースから取得した予約情報を reservations プロパティに設定
          this.setReservations(this.customerData);
          
        }
      } catch (error) {
        console.error('お客さんのデータの取得に失敗しました。', error);
      }
    },

    // カレンダーのボタンステータスを更新
    updateButtonStatus() {
      // カレンダーのボタンステータスを更新するコードを記述
      this.dates.forEach(date => {
        this.timeSlots.forEach(timeSlot => {
          // カレンダーのボタンの ID を作成
          const buttonId = `${date.replace(/\//g, '_')}_${timeSlot.replace(':', '-')}`;

          
          // 予約情報があるかどうかをチェック
          const isReserved = this.customerData.some(reservation => {
            return reservation.date === date && reservation.timeSlot === timeSlot;
          });

          // キャッシュオブジェクトにボタンのステータスを保存
          this.buttonStatusCache[buttonId] = isReserved;

          // 予約がある場合はボタンを非アクティブにする
          const button = document.getElementById(buttonId);

          if (button) {
            button.disabled = isReserved;
          }
          
        });
      });
    },


  } 
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 1750px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #E5EDE9;
  
}

.section {
  width: 75%;
  height: auto;
  margin-left: 12.5%;
  padding-bottom: 70px;
  background-color: #FFFFFF;
}

.contact-outer {
  display: flex;
  justify-content: center;
 
}

.contact-number {
  font-size: 24px;
  font-weight: bold;
  margin-top: 70px;
  margin-left: -395px;
}

.contact-text {
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.05em;
  margin-top: -10px;
  margin-left: -395px;
}

.contact-table__outer {
  display: flex;
  justify-content: center;
}

.contact-table {
  width: 800px;
  color: #FFFFFF;
}

.contact-date1 {
  text-align: center;
  white-space: nowrap;
  padding: 20px;
  font-size: 16px;
  font-weight: normal;
  background-color: #179a17;
  border: 1px solid #FFFFFF;
  border-radius: 4px;
}

.contact-date2 {
  text-align: center;
  width: 60px;
  font-size: 16px;
  background-color: #179a17;
  border: 1px solid #FFFFFF;
  border-radius: 4px;
}

.contact-time1 {
  text-align: center;
  width: 50px;
  font-size: 16px;
  background-color: #179a17;
  border: 1px solid #FFFFFF;
  border-radius: 4px;
}

.contact-time2 {
  background-color: #969996;
  border: 1px solid #FFFFFF;
  border-radius: 4px;
}

.select-btn {
  font-size: 22px;
  border: none;
  width: 100%;
  height: 55px;
  cursor: pointer;
}

.select-btn:hover {
  opacity: 0.7;
}

.clicked-button {
  cursor: default; /* クリックイベントを無効にし、カーソルをデフォルトに変更 */
  opacity: 1 !important;  /* 透明度を変更しない */
}

</style>
