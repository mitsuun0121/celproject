<template>
  <div class="container">
    <mv />
    <div class="section">
      <step03 />
      <form @submit.prevent="guest">
      <div class="comfilm-outer">
        <div class="comfilm-inner">
          <span class="comfilm-time">希望日時</span>
          <span class="comfilm-time__list">{{ formatDateTime(formData.date, formData.timeSlot) }}</span> 
          <p class="comfilm-number">STEP 03</p>
          <p class="comfilm-text">お客様情報を確認してください。</p>
        </div>
      </div>
      <div class="comfilm-table">
        <table>
          <tr>
            <td class="list">お名前</td>
            <td>{{ formData.name }}</td>
          </tr>
          <tr>
            <td class="list">お名前（フリガナ）</td>
            <td>{{ formData.kana }}</td>
          </tr>
          <tr>
            <td class="list">メールアドレス</td>
            <td>{{ formData.email }}</td>
          </tr>
          <tr>
            <td class="list">電話番号</td>
            <td>{{ formData.phone }}</td>
          </tr>
          <tr>
            <td class="list">性別</td>
            <td>{{ formData.gender }}</td>
          </tr>
          <tr>
            <td class="list">お問い合わせ内容</td>
            <td>{{ formData.message }}</td>
          </tr>
        </table>
      </div>
      <div class="btn-container">
        <button class="comfilm-btn" type="submit">送信する</button>
        <router-link class="input-btn" :to="{ path: '/guests/input', query: { formData: JSON.stringify(formData) } }">入力内容を変更する</router-link>
      </div>
      </form>
    </div>
  </div>
</template>

<script>
import mv from '~/components/guests/mv.vue'
import step03 from '~/components/guests/step03.vue'
import { mapState } from 'vuex'


export default {
  layout: 'guest',
  components: {
    mv,
    step03,
    
  },
   data() {
     return {
      formData: {
        name: '',
        kana: '',
        email: '',
        phone: '',
        gender: '',
        message: '',
        date: '',
        timeSlot: '',
        user_id: '',
      },
      allShiftList: [],
      isReservationSuccessful: false, // 送信が成功した場合に true に設定
    };
  },

  mounted() {
    this.fetchGuestList();
    this.fetchUserList();
    this.fetchAllShiftList();
    this.createReservation();
  },

  created() {
    const queryData = this.$route.query;
    if (queryData.date && queryData.timeSlot) {
      // 希望日時のデータをフォームに設定
      this.formData.date = queryData.date;
      this.formData.timeSlot = queryData.timeSlot;
    }
  },
  computed: {
    ...mapState(['reservationData']), // "reservation" はストアモジュールの名前
    
  },

  // ルーターからカウンセリング予約データを受け取り、確認フォームを表示
  async asyncData({ query }) {
    return {
      formData: query,
    };
  },

  methods: {
    formatDateTime(date, timeSlot) {
      const parsedDate = new Date(date);
      parsedDate.getDate();
      const formattedDate = `${parsedDate.getFullYear()}年${parsedDate.getMonth() + 1}月${parsedDate.getDate()}日`;

      // 時間帯のフォーマット（例：10:00から11:00）
      const startTime = timeSlot;
      const endTime = this.calculateEndTime(startTime); // calculateEndTime メソッドを呼び出す

      return `${formattedDate} ${startTime}～${endTime}`;
    },

    // 時間帯の終了時間を計算するメソッド
    calculateEndTime(startTime) {
      // 開始時間から1時間後の時間を計算
      // 例: "10:00" -> "11:00"
      const [hour, minute] = startTime.split(':').map(Number);
      const endTimeHour = hour + 1;
      const endTimeMinute = minute;
      return `${endTimeHour.toString().padStart(2, '0')}:${endTimeMinute.toString().padStart(2, '0')}`;
    },

    // カウンセリング予約に対しての担当カウンセラーの決定
    async createReservation() {
      // カウンセリング予約データをフォームから取得
      const formData = this.formData;
      const reservationdate = formData.date.replace(/\//g, "-");
      const reservationTimeSlot = formData.timeSlot.replace(/:\d{1}$/, '');
      const userList = await this.fetchUserList();
      const guestList = await this.fetchGuestList();
      
      // シフト情報＝予約日時を検索
      const matchedCounselor = [];

      this.allShiftList.forEach(shift => {
        if (shift.date === reservationdate && shift.startTime <= reservationTimeSlot && shift.endTime >= reservationTimeSlot) {
          matchedCounselor.push(shift);
        }
      });
      console.log('シフトのあるカウンセラー', matchedCounselor);

      // 選択されている日時の予約データを抽出
      const selectedReservationDetails = guestList
        .filter(reservation => reservation.date === reservationdate)
        .map(reservation => ({
          date: reservation.date,
          timeSlot: reservation.timeSlot,
          userId: reservation.user_id,
        }));

      console.log('選択されている日時の予約の詳細:', selectedReservationDetails);

      const toMatchedCounselor = userList.filter(user => {
        // 予約されたカウンセラーを除外するための条件
        return !selectedReservationDetails.includes(user.user_id);
      });
      console.log(guestList);
      console.log('利用可能なカウンセラー:', toMatchedCounselor);

      
      // 予約日時にシフト情報があるカウンセラーをランダムに選択
      if (toMatchedCounselor.length > 0) {
        const randomIndex = Math.floor(Math.random() * toMatchedCounselor.length);
        const selectedCounselor = toMatchedCounselor[randomIndex];

        // カウンセラーを設定
        formData.user_id = selectedCounselor.id;

        console.log('選択されたカウンセラー:', selectedCounselor.id);
      } else {
        console.error('利用可能なカウンセラーが見つかりませんでした。');
      }
      
    },

    // カウンセリング予約をデータベースに保存
    async guest() {
      try {

        // フォームデータを取得
        const formData = this.formData;
        const response = await this.$axios.post('http://localhost/api/guest', formData);

        console.log('データが正常に送信され、保存されました:', response.data);
        this.isReservationSuccessful = true;

        this.$router.push("/"); // ホームページなどへリダイレクト
      } catch (error) {
        console.error('データの送信中にエラーが発生しました:', error);
        // エラーメッセージなどを表示
      }
    },

    // カウンセリング予約一覧を取得
    async fetchGuestList() {
      try {
        const response = await this.$axios.get('http://localhost/api/guest');
        const guestList = response.data;
        this.guestList = guestList;
        return guestList;

      } catch (error) {
        console.error('予約データの取得に失敗しました', error);
      }
    },

    // カウンセラーのデータを取得
    async fetchUserList() {
      try {
        const response = await this.$axios.get(`http://localhost/api/user/`);
        const userList = response.data;
        this.userList = userList;
        return userList;

      } catch (error) {
        console.error('カウンセラーの取得に失敗しました', error);
      }
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
          return allShiftList;
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
  },
}

</script>

<style scoped>
.container {
  font-family: "Kosugi Maru";
  width: 100%;
  height: 2500px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #ebf8de;
}

.section {
  width: 75%;
  height: auto;
  margin-left: 12.5%;
  padding-bottom: 70px;
  background-color: #FFFFFF;
}

.comfilm-outer {
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 80px;
}

.comfilm-time {
  font-size: 24px;
  font-weight: bold;
  margin-top: 50px;
  margin-left: -350px;
}

.comfilm-time__list {
  position: absolute;
  top: 3px;
  font-size: 20px;
  letter-spacing: 0.05em;
  margin-left: 30px;
}

.comfilm-number {
  font-size: 24px;
  font-weight: bold;
  margin-top: 50px;
  margin-left: -350px;
}

.comfilm-text {
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.05em;
  margin-top: -10px;
  margin-left: -350px;
  margin-bottom: 50px;
}

.comfilm-table {
  display: flex;
  justify-content: center;
  margin-top: -30px;
}

table {
  border-collapse: collapse;
  width: 700px;
}

td {
  border: 2px solid #747373;
  padding: 20px;
}

td.list {
  width: 150px;
  background-color: whitesmoke;
}

.btn-container {
  text-align: center;
}

.comfilm-btn {
  font-family: "Kosugi Maru";
  font-size: 22px;
  color: #FFFFFF;
  letter-spacing: 0.1em;
  background-color: #3DAB3B;
  border: none;
  margin-top: 60px;
  margin-left: 250px;
  padding: 25px 60px;
  border-radius: 40px;
  transition: 0.7s;
  cursor: pointer;
}

.comfilm-btn:hover {
  opacity: 0.7;
}

.input-btn {
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: 0.1em;
  background-color: #babeb8;
  border: none;
  margin-left: 50px;
  padding: 15px 30px;
  border-radius: 40px;
  transition: 0.7s;
  opacity: 0.7;
  cursor: pointer;
}

 .input-btn:hover {
  opacity: 1;
 }

</style>