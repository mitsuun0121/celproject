<template>
  <div>
    <div class="container">
      <mv />
      <div class="section">
        <step01 />
        <div class="contact-outer">
          <div class="contact-inner">
            <p class="contact-number">STEP 01</p>
            <span class="contact-text">カウンセリング希望日時を選択してください。</span>
            <div class="contact-btn-outer">
              <button class="contact-btn" @click="nextWeek" v-if="currentWeek < 1">翌週<span class="contact-btn-arrow">＞</span></button>
              <button class="contact-btn" @click="thisWeek" v-if="currentWeek > 0">＜<span class="contact-btn-arrow">戻る</span></button>
            </div>
          </div>
        </div>
        
        <div class="contact-table__outer">
          <table class="contact-table">
            <tr>
              <td class="contact-date1">日時</td> <!-- 曜日を表示するヘッダーセル -->
              <td class="contact-date2" v-for="(date, dateIndex) in dates" :key="dateIndex" >
                {{ getDayWeek(date) }}
              </td>
            </tr>
            <tr v-for="(timeSlot, timeIndex) in timeSlots" :key="timeIndex">
              <td class="contact-time1">{{ timeSlot }}</td> <!-- 時間帯を表示 -->
              <td class="contact-time2" v-for="(date, dateIndex) in dates" :key="dateIndex" >
                
                <!-- 予約ボタンを表示 -->
                <button class="select-btn" @click="reservationClick(date, timeSlot)" :disabled="!reserved(date, timeSlot)" :class="{ 'clicked-button': !reserved(date, timeSlot) }"><span v-if="reserved(date, timeSlot)">〇</span><span v-else>✕</span></button>
              </td>
            </tr>
          </table>
        </div>
        <div class="contact-detail">
          <p class="contact-text">※当日のご予約をご希望の際は、お電話にてお問い合わせください。</p>
        </div>
      </div>
      <div class="btn-container">
        <router-link class="input-btn" :to="{ path: '/' }">トップページに戻る</router-link>
      </div>
      <site-footer />
    </div>
  </div>
</template>

<script>
import mv from '~/components/guests/mv.vue'
import step01 from '~/components/guests/step01.vue'
import SiteFooter from '~/components/lpTops/SiteFooter.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapState } from 'vuex'

export default {

  layout: 'guest',

  auth: false,

  components: {
    mv,
    step01,
    SiteFooter,
    FontAwesomeIcon,
  },

  data() {
    return {
      guestData: [],
      allShiftList: [],
      startDate: new Date(), // 開始日を設定
      numDays: 7, // 表示する日数
      timeSlots: ['10:00', '11:00', '12:00', '13:00','14:00', '15:00', '16:00', '17:00',], // 時間帯のリスト
      currentWeek: 0, // 現在の週を初期化
    };
  },
  
  computed: {
    dates() {
      // 開始日から指定した日数分の日にちを計算
      const dates = [];
      const startDate = new Date(this.startDate);
      startDate.setDate(startDate.getDate() + 7 * this.currentWeek); // 7日ごとに週を切り替える
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

      for (let i = 0; i < this.numDays; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);

        const formattedDate = currentDate.toLocaleDateString(undefined, options);
        dates.push(formattedDate);
      }
      return dates;
    },
    ...mapState(['reservationData']), // "reservation" はストアモジュールの名前
  },

  mounted() {
    this.fetchAllShiftList(); // 全カウンセラーのシフトデータを取得
    this.fetchGuestData();
    
  },

  methods: {

    // 予約日時を表示
    getDayWeek(date) {
      // 日にちに対応する曜日を計算
      const dayWeek = ['日', '月', '火', '水', '木', '金', '土'];
      const currentDate = new Date(date.replace(/\//g, '-'));
      const dayIndex = currentDate.getDay();
      const month = currentDate.getMonth() + 1; // 月は0から始まるため+1する
      const day = currentDate.getDate();
      return `${month}月${day}日（${dayWeek[dayIndex]}）`;
    },

    // 現在の週を1週進める
    nextWeek() {
      this.currentWeek++; 
    },

    // 今週に戻る
    thisWeek() {
      this.currentWeek--; 
    },

    // ipput.vueへ遷移するための関数
    reservationClick(date, timeSlot) {
      // 選択した日時データをオブジェクトとしてまとめる
      const reservationData = {
        date: date,
        timeSlot: timeSlot,
      };
      
      // reservationDataをストアに保存
      this.$store.dispatch('saveReservationData', reservationData);
      
      // inputページに遷移
      this.$router.push({ path: '/guests/input', query: { date: date, timeSlot: timeSlot } });
      
    },

    // 全シフトデータを取得する関数
    async fetchAllShiftList() {
      try {
        const response = await this.$axios.get('http://localhost/api/all_shift');
        if (response && response.data && Array.isArray(response.data)) {
          this.allShiftList = response.data.map(shift => ({
            userId: shift.user_id,
            date: shift.shift_date ? shift.shift_date.split(' ')[0] : '日付なし', // 日付を"YYYY-MM-DD"形式に整形
            startTime: shift.start_time ? shift.start_time.slice(0, 5) : '00:00', // 時間を"HH:MM"形式に整形
            endTime: shift.end_time ? shift.end_time.slice(0, 5) : '00:00', // 時間を"HH:MM"形式に整形
          }));

          const allShiftList = {};

          this.allShiftList.forEach(shift => {
            const userId = shift.userId;
            const date = shift.date;
            const startTime = shift.startTime;
            const endTime = shift.endTime;

            // 必要なプロパティが存在しない場合は初期化する
            if (!allShiftList[userId]) {
              allShiftList[userId] = {};
            }
            if (!allShiftList[userId][date]) {
              allShiftList[userId][date] = {};
            }

            // 対応する時間帯にシフト情報を設定
            for (let time = startTime; time <= endTime; time = this.nextTimeSlot(time)) {
              if (!allShiftList[userId][date][time]) {
                allShiftList[userId][date][time] = [];
              }
              allShiftList[userId][date][time].push({ userId });
            }
          });
          
        }
      } catch (error) {
        console.error('一覧の取得に失敗しました。', error);
      }
    },

    nextTimeSlot(time) {
      // 次の時間帯を計算するヘルパーメソッド
      // 例: '10:00' -> '11:00'
      const [hours, minutes] = time.split(':');
      const nextHours = parseInt(hours, 10) + 1;
      return `${nextHours.toString().padStart(2, '0')}:${minutes}`;
    },

    // 予約ボタンの非アクティブ/アクティブ状態を判定するメソッド
    reserved(date, timeSlot) {
      const formatDate = date.replace(/\//g, '-').split('-').map(function (part) { return part.padStart(2, '0'); }).join('-');
      const formatTimeSlot = timeSlot;

      // お客さんの予約日時をチェック
      const guestReserved = this.guestData.filter(item => {
        const guestDate = item.date;
        const guestTimeSlot = item.timeSlot.slice(0, 5);
        return guestDate === formatDate && guestTimeSlot === formatTimeSlot;
      }).length;

      // カウンセラーのシフト日時をチェック
      const counselorShift = this.allShiftList.filter(shift => {
        const shiftDate = shift.date;
        const shiftStartTime = shift.startTime.slice(0, 5);
        const shiftEndTime = shift.endTime.slice(0, 5);
        return shiftDate === formatDate && shiftStartTime <= formatTimeSlot && shiftEndTime >= formatTimeSlot;
      }).length;

      // 予約とシフトを比較して日時ボタンのアクティブ非アクティブを決定
      if (guestReserved === counselorShift) {
        return false;
      }
      
      // 当日は終日非アクティブ
      if (date === this.dates[0] && this.timeSlots.indexOf(timeSlot) >= 0) {
        return false;
      }
      return counselorShift;
    },

    // バックエンドからお客さんのデータを取得
    async fetchGuestData() {
      try {
        const response = await this.$axios.get('http://localhost/api/guest');
      
        if (response && response.data) {
          // バックエンドから取得したデータをフィルタリング
          this.guestData = response.data.map(item => ({
            date: item.date.replace(/-/g, '-'),
            timeSlot: item.timeSlot.substring(0, 5),
          }));
        }
        this.guestCount = this.guestData.length; // 予約の数を取得
      } catch (error) {
        console.error('お客さんのデータの取得に失敗しました。', error);
      }
    },

  } 
}
</script>

<style scoped>
.container {
  font-family: "Kosugi Maru";
  width: 100%;
  height: auto;
  background-color: #ebf8de;
}

.section {
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  padding-bottom: 70px;
  background-color: #FFFFFF;
}

.contact-outer {
  position: relative;
  width: 80%;
  margin-left: 10.5%;
  padding-bottom: 20px;
}

.contact-number {
  font-size: 24px;
  font-weight: bold;
  margin-top: 70px;
  margin-bottom: 15px;
}

.contact-text {
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.05em;
  margin-top: -20px;
  white-space: nowrap;
}

.contact-btn-outer {
  position: absolute;
  top: 30px;
  right: 9px;
  white-space: nowrap;
}

.contact-btn {
  font-family: "Kosugi Maru";
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.1em;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #e3e3e3;
}

.contact-btn-arrow {
  font-size: 16px;
  font-weight: bold;
  margin-left: 5px;
}

.contact-detail {
  width: 80%;
  margin-left: 10.5%;
  margin-top: 40px;
}

.contact-table__outer {
  display: flex;
  justify-content: center;
}

.contact-table {
  width: 80%;
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
  background-color: #ededed;
  border: 1px solid #FFFFFF;
  border-radius: 4px;
}

.select-btn {
  font-size: 22px;
  color: #333;
  border: none;
  width: 100%;
  height: 55px;
  cursor: pointer;
}

.select-btn:disabled {
  background-color: #bbbaba;
}
.select-btn:hover {
  opacity: 0.5;
}

.clicked-button {
  cursor: default; /* クリックイベントを無効にし、カーソルをデフォルトに変更 */
  opacity: 1 !important;  /* 透明度を変更しない */
}

.btn-container {
  margin-top: 100px;
  margin-bottom: 100px;
  text-align: center;
}

.input-btn {
  font-family: "Kosugi Maru";
  font-size: 22px;
  color: #FFFFFF;
  letter-spacing: 0.1em;
  background-color: #3DAB3B;
  border: none;
  margin-top: 10px;
  padding: 25px 30px;
  border-radius: 40px;
  transition: 0.7s;
}

.input-btn:hover {
  opacity: 0.8;
}

</style>
