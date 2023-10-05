<template>
  <div class="container">
    <mv />
    <div class="section">
      <step03 />
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
    </div>
  </div>
</template>

<script>
import mv from '~/components/guests/mv.vue'
import step03 from '~/components/guests/step03.vue'
import { mapState } from 'vuex'


export default {
  layout: 'default',
  components: {
    mv,
    step03,
    
  },
  computed: {
    ...mapState('reservation', ['reservationData']), // "reservation" はストアモジュールの名前
    
  },
  async asyncData({ query }) {
    // ルーターからデータを受け取り、ページで使用するために返します
    return {
      formData: query,
      
    };
  },
  methods: {
    formatDateTime(date, timeSlot) {
      const parsedDate = new Date(date);
      const formattedDate = `${parsedDate.getFullYear()}年${parsedDate.getMonth() + 1}月${parsedDate.getDate()}日`;

      // 時間帯のフォーマット（10:00から11:00のように）
      const startTime = timeSlot;
      const endTime = this.calculateEndTime(startTime); // calculateEndTime メソッドを呼び出す

      return `${formattedDate} ${startTime}～${endTime}`;
    },
    // 時間帯の終了時間を計算するメソッド
    calculateEndTime(startTime) {
      // ここで開始時間から1時間後の時間を計算し、返します
      // 例: "10:00" -> "11:00"
      const [hour, minute] = startTime.split(':').map(Number);
      const endTimeHour = hour + 1;
      const endTimeMinute = minute;
      return `${endTimeHour.toString().padStart(2, '0')}:${endTimeMinute.toString().padStart(2, '0')}`;
    },
  },
}

</script>

<style scoped>
.container {
  width: 100%;
  height: 2500px;
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
  margin-top: -20px;
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
  font-size: 22px;
  color: #FFFFFF;
  letter-spacing: 0.1em;
  background-color: #3DAB3B;
  border: none;
  margin-top: 60px;
  margin-left: 250px;
  padding: 20px 60px;
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