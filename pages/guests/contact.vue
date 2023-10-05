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
              <button class="select-btn" @click="reservationClick(date, timeSlot)" :disabled="isReserved(date, timeSlot)" :class="{ 'clicked-button': isReserved(date, timeSlot) }"><span v-if="!isReserved(date, timeSlot)">〇</span><span v-else>✕</span></button>
            </td>
          </tr>
        </table>
      </div>
      <NuxtLink to="/guests/input"><link-button /></NuxtLink>
    </div>
  </div>
</template>


<script>
import mv from '~/components/guests/mv.vue'
import step01 from '~/components/guests/step01.vue'
import LinkButton from '~/components/LinkButton.vue'


export default {
  layout: 'default',
  components: {
    mv,
    step01,
    LinkButton
    
  },
  data() {
    return {
      startDate: new Date(), // 開始日を設定
      numDays: 7, // 表示する日数
      timeSlots: ['10:00', '11:00', '12:00', '13:00','14:00', '15:00', '16:00', '17:00',], // 時間帯のリスト
      reservations: { // 予約情報を管理するデータ
        reservationData: {}, // 初期化
      }, 
    };
  },
  created() {
    this.updateStartDate(); // コンポーネントが作成された際に開始日を設定
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
  },
  methods: {
    updateStartDate() {
      setInterval(() => {
        const currentDate = new Date();
        this.startDate = currentDate; // startDate を現在の日付に設定
      },);
    },
    getDayOfWeek(date) {
      // 日にちに対応する曜日を計算
      const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
      const currentDate = new Date(date);
      const dayIndex = currentDate.getDay();
      const month = currentDate.getMonth() + 1; // 月は0から始まるため+1する
      const day = currentDate.getDate();
      return `${month}月${day}日（${dayOfWeek[dayIndex]}）`;
    },
    
    reservationClick(date, timeSlot) {
      const key = date + timeSlot;
      const reservationData = {
        date: date,
        timeSlot: timeSlot,
      };
      this.$store.commit('reservation/setReservationData', reservationData);
      
      // 別のページに遷移
      this.$router.push('/guests/input');
    },
    isReserved(date, timeSlot) {
      const key = date + timeSlot;
      if (this.$store.state.reservation.reservationData) {
        return this.$store.state.reservation.reservationData[key] || false;
      }
      return false;
    },
  },
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
