<template>
  <div>
    <div class="container">
      <div class="price-section" id="Price">
        <p class="price-heading">料金説明</p>
          <div class="price-pig">
            <img class="pig poyopoyo" src="~/assets/img/pig.png" alt="豚さん">
          </div>
      </div>
      <div class="price-outer">
        <div class="price-area1" ref="course1">
          <div class="price-group">
            <p class="price-title1">１ヶ月コース</p>
            <p class="price-price">１００,０００円<span class="price-price-tax">（税込み）</span></p>
          </div>
          <div class="price-group-inner">
            <div><img class="pc" src="~/assets/img/pc.png" alt="パソコン"></div>
            <p class="price-minute">１回／６０分</p>
          </div>
          <div class="price-group">
            <p class="price-time">面談回数／４回</p>
          </div>
        </div>
        <div class="price-area2" ref="course2">
          <div class="price-group">
            <p class="price-title2">３ヶ月コース</p>
            <p class="price-price">２７０,０００円<span class="price-price-tax">（税込み）</span></p>
          </div>
          <div class="price-group-inner">
            <div><img class="pc" src="~/assets/img/pc.png" alt="パソコン"></div>
            <p class="price-minute">１回／６０分</p>
          </div>
          <div class="price-group">
            <p class="price-time">面談回数／１２回</p>
          </div>
        </div>
      </div>
      <div class="price-feature" ref="feature">
        <div class="price-feature1">
          <div class="price-circle">
            <div class="price-icon"><font-awesome-icon :icon="['fas', 'check']"/></div>
          </div>
          <p class="price-text">専属コーチとの週次面談</p>
        </div>
        <div class="price-feature2">
          <div class="price-circle">
            <div class="price-icon"><font-awesome-icon :icon="['fas', 'check']"/></div>
          </div>
          <p class="price-text">チャットサポート</p>
        </div>
        <div class="price-feature3">
          <div class="price-circle">
            <div class="price-icon"><font-awesome-icon :icon="['fas', 'check']"/></div>
          </div>
          <p class="price-text">CEL会員同士のコミュニティ</p>
        </div>
      </div>
      <div class="btn-container">
        <router-link class="counseling-btn" :to="{ path: '/guests/contact' }">無料カウンセリングはこちら</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  components: {
    FontAwesomeIcon,
  },

  mounted() {
    const options = {
      root: null, // 交差を検出するビューポートを指定
      rootMargin: '0px', // 要素が画面内に1ピクセルでも表示されたら実行
      threshold: 0.1, // 10%以上表示されたらコールバックを実行
    };

    // 要素がビューポート内に表示されたらアニメーションを開始
    const observer = new IntersectionObserver(this.handleIntersection, options);
    const observer1 = new IntersectionObserver(this.handleIntersection, options);
    const observer2 = new IntersectionObserver(this.handleIntersection, options);

    observer.observe(this.$refs.course2);
    observer1.observe(this.$refs.course1);
    observer2.observe(this.$refs.feature);
  },

  methods: {
    // 要素がビューポート内に表示されたらアニメーションを開始
    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === this.$refs.course2) {
            this.startAnimation(this.$refs.course2);
          } else if (entry.target === this.$refs.course1) {
            setTimeout(() => {
              this.startAnimation(this.$refs.course1);
            }, 500);
          } else if (entry.target === this.$refs.feature) {
            setTimeout(() => {
              this.startAnimation(this.$refs.feature);
            }, 300);
          } 

        }
      });
    },

    // アニメーションの開始処理
    startAnimation(targetElement) {
      targetElement.classList.add('slide-right'); // classを追加
      targetElement.classList.add('slide-left');
      targetElement.classList.add('feature');
    },
  }
}
</script>

<style scoped>
.container {
  font-family: "Kosugi Maru";
  width: 100%;
  height: auto;
  background-color: #fffff4;
  padding-top: 80px;
}

.price-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 200px;
  column-gap: 50px;
  margin-bottom: 80px;
}

.price-heading {
  font-size: 28px;
  font-weight: bold;
  color: #3DAB3B;
  letter-spacing: 0.1em;
  line-height: 2.0;
  border-bottom: 4px solid #3DAB3B;
}

/*------------ 豚さんぽよぽよ --------------*/
.pig.poyopoyo {
  width: 150px;
  animation: poyopoyo 2s ease-out infinite;
  opacity: 1;
}

@keyframes poyopoyo {
  0%, 40%, 60%, 80% {
    transform: scale(1.0);
  }
  50%, 70% {
    transform: scale(0.95);
  }
}
/*-----------------------------------------*/

.price-outer {
  display: flex;
  justify-content: center;
  column-gap: 150px;
}

/*------------ スライドイン --------------*/
.price-area2 {
  position: relative;
  background-color: #FFFFFF;
  border: 1px solid #b9b6b6;
  padding-bottom: 280px;
  left: 200px;/* 初期位置：画面左外 */
  opacity: 0; 
  transition: left 0.6s, opacity 1s;
}

.slide-right {
  left: 0; /* スライドイン：画面内 */
  opacity: 1;
}

.price-area1 {
  position: relative;
  background-color: #FFFFFF;
  border: 1px solid #b9b6b6;
  padding-bottom: 280px;
  left: -200px;/* 初期位置：画面左外 */
  opacity: 0; 
  transition: left 0.6s, opacity 1s;
}

.slide-left {
  left: 0; /* スライドイン：画面内 */
  opacity: 1;
}
/*-----------------------------------------*/

.price-group {
  width: 400px;
  background-color: #FFFFFF;
  
}

.price-title1 {
  font-size: 24px;
  color: #FFFFFF;
  letter-spacing: 0.1em;
  text-align: center;
  padding: 20px;
  margin-top: 0;
  background-color: #CD4A00;
  border-bottom: 1px solid #b9b6b6;
}

.price-title2 {
  font-size: 24px;
  color: #FFFFFF;
  letter-spacing: 0.1em;
  text-align: center;
  padding: 20px;
  margin-top: 0;
  background-color: #D89B00;
  border-bottom: 1px solid #b9b6b6;
}

.price-price {
  width: 290px;
  font-size: 24px;
  color: #FF0505;
  letter-spacing: 0.05em;
  line-height: 2.0;
  padding-top: 20px;
  margin-left: 60px;
  margin-bottom: 0;
  border-bottom: 3px solid #333;
}

.price-price-tax {
  font-size: 18px;
  color: #000000;
}

.price-group-inner {
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 30px;
  background-color: #FFFFFF;
  padding-top: 40px;
  padding-bottom: 40px;
}
.pc {
  width: 90px;
}

.price-minute {
  font-size: 20px;
  letter-spacing: 0.05em;
  padding: 25px;
  background-color: #DEDEDE;
}

.price-time {
  width: 300px;
  font-size: 20px;
  letter-spacing: 0.05em;
  text-align: center;
  padding: 25px 50px;
  margin-top: 0;
  margin-left: 50px;
  background-color: #DEDEDE;
}

/*-------------- ズームイン -----------------*/
.price-feature {
  position: relative;
  display: flex;
  justify-content: center;
  transform: scale(0.8);
  transition: transform 0.3s, opacity 1s;
  opacity:0;
}
/*-------------------------------------------*/

.feature {
  transform: scale(1);
  opacity: 1;
}

.price-feature1 {
  position: absolute;
  top: -240px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
  padding-left: 300px;
  padding-right: 290px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #DEDEDE;
}

.price-feature2 {
  position: absolute;
  top: -160px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
  padding-left: 300px;
  padding-right: 363px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #DEDEDE;
}

.price-feature3 {
  position: absolute;
  top: -100px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
  padding-left: 300px;
  padding-right: 250px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #DEDEDE;
}

.price-circle {
  position: relative;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #3DAB3B; 
}

.price-icon {
  position: absolute;
  top: 10px;
  left: 13px;
  font-size: 23px;
  color: #FFFFFF;
}

.price-text {
  font-size: 22px;
  letter-spacing: 0.1em;
}

.btn-container {
  margin-top: 120px;
  padding-bottom: 120px;
  text-align: center;
}

.counseling-btn {
  font-size: 24px;
  color: #FFFFFF;
  letter-spacing: 0.1em;
  background-color: #3DAB3B;
  padding: 30px 30px;
  border-radius: 40px;
  transition: 0.7s;
}
</style>

