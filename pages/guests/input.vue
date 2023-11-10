<template>
  <div class="container">
    <mv />
    <div class="section">
      <step02 />
      <div class="input-outer">
        <div class="input-inner">
          <span class="input-time">希望日時</span>
          <span class="input-time__list" v-if="reservationData">{{ formatDateTime(reservationData.date, reservationData.timeSlot) }}</span> 
          <NuxtLink to="/guests/contact"><span class="contact-btn">日時を変更する</span></NuxtLink>
          <p class="input-number">STEP 02</p>
          <p class="input-text">お客様情報を入力してください。</p>
        </div>
      </div>
      <div class="form-input__outer">
        <ValidationObserver ref="inputserver">
          <form @submit.prevent="guest">
            <ValidationProvider mode='lazy' v-slot="{ errors }" rules="required">
              <div class="form-group">
                <label for="name">お名前<span class="must">必須</span></label>
                <input type="text" id="name" v-model="formData.name" name="名前" placeholder="山田　太郎" :class="{ 'has-error': errors.length > 0 }">
                <div class="message">
                  <span class="error-message">{{ errors[0] }}</span>
                </div>
              </div>
            </ValidationProvider>
            <ValidationProvider mode='lazy' v-slot="{ errors }" rules="required">
              <div class="form-group">
                <label for="kana">お名前（フリガナ）<span class="must">必須</span></label>
                <input type="text" id="kana" v-model="formData.kana" name="フリガナ" placeholder="ヤマダ　タロウ" :class="{ 'has-error': errors.length > 0 }">
                <div class="message">
                  <span class="error-message">{{ errors[0] }}</span>
                </div>
              </div>
            </ValidationProvider>
            <ValidationProvider mode='lazy' v-slot="{ errors }" rules="email|required">
              <div class="form-group">
                <label for="email">メールアドレス<span class="must">必須</span></label>
                <input type="email" id="email" v-model="formData.email" name="メールアドレス" :class="{ 'has-error': errors.length > 0 }" placeholder="test@example.com">
                <div class="message">
                  <span class="error-message">{{ errors[0] }}</span>
                </div>
              </div>
            </ValidationProvider>
            <ValidationProvider mode='lazy' v-slot="{ errors }" rules="min:10|phone|required">
              <div class="form-group">
                <label for="tel">電話番号<span class="must">必須</span></label>
                <input type="phone" id="phone" v-model="formData.phone" name="電話番号" :class="{ 'has-error': errors.length > 0 }" placeholder="半角数字ハイフンなし">
                <div class="message">
                  <span class="error-message">{{ errors[0] }}</span>
                </div>
              </div>
            </ValidationProvider>
            <ValidationProvider mode='lazy' v-slot="{ errors }" rules="required">
              <div class="form-group">
                <label for="gender">性別<span class="must">必須</span></label>
                <div class="form-gender">

                  <label class="label-radio">
                  <input type="radio" id="male" value="男性" v-model="formData.gender" name="性別" :class="{ 'has-error': errors.length > 0 }"><span class="radio-gender">男性</span>
                  </label>

                  <label class="label-radio">
                  <input type="radio" id="female" value="女性" v-model="formData.gender" name="性別" :class="{ 'has-error': errors.length > 0 }"><span class="radio-gender">女性</span>
                  </label>

                  <label class="label-radio">
                  <input type="radio" id="other" value="無回答" v-model="formData.gender" name="性別" :class="{ 'has-error': errors.length > 0 }"><span class="radio-gender">無回答</span>
                  </label>

                </div>
                <div class="message">
                  <span class="error-message">{{ errors[0] }}</span>
                </div>
              </div>
            </ValidationProvider>
            <ValidationProvider mode='lazy' v-slot="{ errors }" rules="required">
              <div class="form-group">
                <label class="textarea" for="message">お問い合わせ内容<span class="must">必須</span></label>
                <textarea id="message" v-model="formData.message" name="お問い合わせ内容" :class="{ 'has-error': errors.length > 0 }"></textarea>
                <div class="message">
                  <span class="error-message">{{ errors[0] }}</span>
                </div>
              </div>
              <div class="btn-container">
                <button class="input-btn" type="submit">お客様情報を確認する</button>
              </div>
            </ValidationProvider>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import mv from '~/components/guests/mv.vue'
import step02 from '~/components/guests/step02.vue'
import { mapState } from 'vuex'


export default {
  layout: 'guest',
  components: {
    mv,
    step02,
    
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
      },
      isReservationSuccessful: false,
    };
  },
  created() {
    // 入力データを保持した状態に設定
    const formDataParam = this.$route.query.formData;
    if (formDataParam) {
      this.formData = JSON.parse(formDataParam);
    }

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
  methods: {
    async guest() {
      // バリデーションを実行
      const isValid = await this.$refs.inputserver.validate();

      if (isValid) {
        // バリデーションが成功した場合、確認ページへ
        try {
          const query = {
            name: this.formData.name,
            kana: this.formData.kana,
            email: this.formData.email,
            phone: this.formData.phone,
            gender: this.formData.gender,
            message: this.formData.message,
            date: this.reservationData.date,
            timeSlot: this.reservationData.timeSlot,
          };

          await this.$router.push({ path: "/guests/comfilm", query });
          
        } catch (error) {
          console.error('画面遷移時のエラー:', error);
        }
      }
    },

    formatDateTime(date, timeSlot) {
      const parsedDate = new Date(date);
      parsedDate.getDate();
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
      if (startTime) {
        const [hour, minute] = startTime.split(':').map(Number);
        const endTimeHour = hour + 1;
        const endTimeMinute = minute;
        return `${endTimeHour.toString().padStart(2, '0')}:${endTimeMinute.toString().padStart(2, '0')}`;
      } else {
        // startTimeがnullの場合にどのように処理するかを決定
        // 例: エラーメッセージを返すか、デフォルト値を設定するか
        return 'N/A'; // または他の適切なデフォルト値
      }
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

.input-outer {
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 80px;
}

.input-time {
  font-size: 24px;
  font-weight: bold;
  margin-left: -255px;
}

.input-time__list {
  position: absolute;
  top: 3px;
  font-size: 20px;
  letter-spacing: 0.05em;
  margin-left: 30px;
}

.contact-btn {
  position: absolute;
  top: -3px;
  font-size: 14px;
  color: #FFFFFF;
  letter-spacing: 0.05em;
  padding: 10px 20px;
  background-color: #babeb8;
  border-radius: 32px;
  margin-left: 380px;
}

.input-number {
  font-size: 24px;
  font-weight: bold;
  margin-top: 50px;
  margin-left: -255px;
}

.input-text {
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.05em;
  margin-top: -10px;
  margin-left: -255px;
  margin-bottom: 30px;
}

.form-input__outer {
  display: flex;
  justify-content: center;
}

.form-group {
  margin-bottom: 15px; /* 各フォーム項目の間に余白を追加 */
}

label {
  display: block;
  width: 200px;
  margin-right: 30px;
  margin-left: 25px;
  margin-bottom: 5px;
  font-size: 16px;
  line-height: 2.0;
  letter-spacing: 0.05em;
}

.must {
  font-size: 12px;
  color: #ff0000;
  border: 1px solid #ff0000;
  border-radius: 4px;
  background-color: #f9c6c6;
  padding: 3px 5px;
  margin-left: 5px;
  
}

.form-gender {
  display: flex;
  width: 50%;
  margin-left: -25px;
}

.label-radio {
  display: grid;
  grid-auto-columns: 1fr;
	grid-auto-flow: column;
	width: fit-content;
	gap: 1rem;
  
}
  
.radio-gender {
  position: relative;
  top: 6px;
  right: 10px;
  white-space: nowrap;
}

/* ラジオボタンの装飾  */
input[type="radio"] {
  position: relative;
  width: 16px;
  height: 16px;
  border: 2px solid #3DAB3B;
  border-radius: 50%;
  vertical-align: -2px;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}

input[type="radio"]:checked:before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #3DAB3B;
  content: '';
}

input {
  outline: none;
  font-size: 16px;
  width: 500px;
  padding: 15px;
  letter-spacing: 0.1em;
  border: 2px solid #3DAB3B;
  border-radius: 4px;
  margin-left: 20px;
}

textarea {
  outline: none;
  font-size: 16px;
  width: 500px;
  height: 200px;
  padding: 15px;
  letter-spacing: 0.1em;
  border: 2px solid #3DAB3B;
  border-radius: 4px;
  margin-left: 20px;
  font-family: inherit; /* インプットと同じフォント指定 */
}

.btn-container {
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


/* バリデーション */
.message {
  text-align: left;
  margin: 0 auto;
  height: 30px;
  margin-top: 10px;
  margin-left: 25px;
  
}
.error-message {
  font-size: 16px;
  color: #ff0000;
}

.has-error {
  border: 2px solid #ff0000;
  background: #f9c6c6;
}
</style>