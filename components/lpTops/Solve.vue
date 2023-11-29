<template>
  <div>
    <div class="container">
      <div class="solve-section" id="Solve">
        <p class="solve-heading">CELの解決方法</p>
          <div class="solve-exclamation">
            <img class="solve-couple" src="~/assets/img/smile-color.png" alt="喜ぶ夫婦">
            <img class="exclamation" src="~/assets/img/exclamation.png" ref="exclamate" alt="ビックリマーク">
          </div>
      </div>

      <div class="solve-area">
        <img class="solve-coaching" src="~/assets/img/step1.png" alt="コーチング">
      </div>
      <div class="solve-area">
        <div class="solve-group">
          <h2 class="solve-item">STEP<span class="solve-item-sub">1</span></h2>
          <p class="solve-title">子育てのお悩みを、<span class="solve-title-sub">コーチング</span>します</p>
          <p class="solve-text">担当カウンセラーがお悩みをヒアリングして、</p>
          <p class="solve-text">解決方法を導き出します。</p>
        </div>
      </div>
      <div class="solve-area">
        <img class="solve-feedback" src="~/assets/img/step2.png" alt="フィードバック">
      </div>
      <div class="solve-area">
        <div class="solve-group">
          <h2 class="solve-item">STEP<span class="solve-item-sub">2</span></h2>
          <p class="solve-title"><span class="solve-title-sub">行動</span>の結果を<span class="solve-title-sub">フィードバック</span>します</p>
          <p class="solve-text">導き出した解決方法を試した結果をカウンセラーと</p>
          <p class="solve-text">共有することで、最適解になるように導いていきます。</p>
        </div>
      </div>

      <div class="solve-feature">
        <img class="solve-point" src="~/assets/img/point.png" alt="ポイント">
      </div>  
      <div class="solve-feature-feature" ref="feature">  
        <span class="solve-feature-title"><span class="solve-feature-title-sub">CEL</span>独自の二つのアプローチによる問題解決へのプロセス</span>
      </div>

      <div class="solve-featue-outer1">
        <div class="solve-feature-inner1">
          <p class="solve-featue-menu">悩み</p>
          <p class="solve-featue-item">それぞれが抱える問題</p>
        </div>
      </div>
      <div class="solve-feature">
        <img class="object1" src="~/assets/img/worry-couple.png" alt="悩む夫婦">
      </div>
      <div class="solve-feature">
        <img class="arrow1" src="~/assets/img/arrow1.png" ref="arrowA" alt="矢印1">
      </div>

      <div class="solve-featue-outer1">
        <div class="solve-feature-inner2">
          <p class="solve-featue-menu">コーチング</p>
          <p class="solve-featue-item">解決方法を導き出す</p>
        </div>
      </div>
      <div class="solve-feature">
        <img class="object2" src="~/assets/img/coaching.png" alt="コーチング">
      </div>

      <div class="solve-feature1">
        <div><img class="arrow4" src="~/assets/img/arrow4.png" ref="arrowD" alt="矢印4"></div>
        <div><img class="arrow2" src="~/assets/img/arrow2.png" ref="arrowB" alt="矢印2"></div>
      </div>
      
      <div class="solve-featue-outer2">
        <div class="solve-feature-inner3">
          <p class="solve-featue-menu">フィードバック</p>
          <p class="solve-featue-item">実践した結果を報告</p>
        </div>
        <div class="solve-feature">
          <img class="arrow3" src="~/assets/img/arrow3.png" ref="arrowC" alt="矢印3">
        </div>
        <div class="solve-feature-inner4">
          <p class="solve-featue-menu">行動</p>
          <p class="solve-featue-item">解決方法を実践</p>
        </div>
      </div>
      <div class="solve-feature-outer3">
        <div class="solve-feature">
          <img class="object4" src="~/assets/img/feedback.png" alt="フィードバック">
        </div>
        <div class="solve-feature">
          <img class="object3" src="~/assets/img/action.png" alt="アクション">
        </div>
      </div>
      <div class="solve-feature">
        <img class="arrow5" src="~/assets/img/arrow5.png" ref="arrowE" alt="矢印5">
      </div>
      <div class="solve-featue-outer1">
        <div class="solve-feature-inner5">
          <p class="solve-featue-menu">解決</p>
          <p class="solve-featue-item">問題が解消される</p>
        </div>
      </div>
      <div class="solve-feature">
        <img class="object5" src="~/assets/img/solve.png" alt="喜ぶ夫婦">
      </div>
      <div class="btn-container">
        <router-link class="counseling-btn" :to="{ path: '/guests/contact' }">無料カウンセリングはこちら</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  mounted() {
    const options = {
      root: null, // 交差を検出するビューポートを指定
      rootMargin: '0px', // 要素が画面内に1ピクセルでも表示されたら実行
      threshold: 0.6, // 60%以上表示されたらコールバックを実行
    };

    // 要素がビューポート内に表示されたらアニメーションを開始
    const observer = new IntersectionObserver(this.handleIntersection, options);
    const observer1 = new IntersectionObserver(this.handleIntersection, options);
    const observer2 = new IntersectionObserver(this.handleIntersection, options);
    const observer3 = new IntersectionObserver(this.handleIntersection, options);
    const observer4 = new IntersectionObserver(this.handleIntersection, options);
    const observer5 = new IntersectionObserver(this.handleIntersection, options);
    const observer6 = new IntersectionObserver(this.handleIntersection, options);

    observer.observe(this.$refs.exclamate);
    observer1.observe(this.$refs.feature);
    observer2.observe(this.$refs.arrowA);
    observer3.observe(this.$refs.arrowB);
    observer4.observe(this.$refs.arrowC);
    observer5.observe(this.$refs.arrowD);
    observer6.observe(this.$refs.arrowE);
  },

  methods: {
    // 要素がビューポート内に表示されたらアニメーションを開始
    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === this.$refs.exclamate) {
            this.startAnimation(this.$refs.exclamate);
          } else if (entry.target === this.$refs.feature) {
            this.startAnimation(this.$refs.feature);
          } else if (entry.target === this.$refs.arrowA) {
            this.startAnimation(this.$refs.arrowA);
          } else if (entry.target === this.$refs.arrowB) {
            setTimeout(() => {
              this.startAnimation(this.$refs.arrowB);
            }, 500);
          } else if (entry.target === this.$refs.arrowC) {
            setTimeout(() => {
              this.startAnimation(this.$refs.arrowC);
            }, 800);
          } else if (entry.target === this.$refs.arrowD) {
            setTimeout(() => {
              this.startAnimation(this.$refs.arrowD);
            }, 1800);
          } else if (entry.target === this.$refs.arrowE) {
            setTimeout(() => {
              this.startAnimation(this.$refs.arrowE);
            }, 1000);
          }
          
        }
      });
    },

    // アニメーションの開始処理
    startAnimation(targetElement) {
      targetElement.classList.add('fade-up');
      targetElement.classList.add('slide-in');
      targetElement.classList.add('arrowA');
      targetElement.classList.add('arrowB');
      targetElement.classList.add('arrowC');
      targetElement.classList.add('arrowD');
      targetElement.classList.add('arrowE');
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
  padding-top: 150px;
}

.solve-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 200px;
  margin-bottom: 60px;
  column-gap: 50px;
  
}

.solve-heading {
  font-size: 28px;
  font-weight: bold;
  color: #3DAB3B;
  letter-spacing: 0.1em;
  line-height: 2.0;
  border-bottom: 4px solid #3DAB3B;
}

.solve-exclamation {
  position: relative;
}

/*--------- フェードアップアニメーション -------*/
.exclamation {
  position: absolute;
  width: 100px;
  margin-left: 25px;
  bottom: 40px;
  transition: bottom 1s ease-in-out, opacity 2s ease-in-out; /* 完了に2.5秒かかる */
  opacity:0;
}

.fade-up {
  bottom: 70px;
  opacity: 1;
}
/*----------------------------------------------*/

.solve-couple {
  width: 150px;
  
}

.solve-area {
  position: relative;
  display: flex;
  justify-content: center;
  
}

.solve-group {
  width: 600px;
  margin-top: 40px;
  margin-bottom: 80px;
  margin-left: 180px;
  padding-left: 50px;
  padding-bottom: 50px;
  background-color: #FFFFFF;
  border: 1px solid #b9b6b6;
}

.solve-coaching {
  position: absolute;
  top: 80px;
  z-index: 1;
  margin-right: 560px;
  width: 180px;
  height: auto;
  
}

.solve-feedback {
  position: absolute;
  top: 87px;
  z-index: 1;
  margin-right: 560px;
  width: 160px;
  height: auto;
  
}

.solve-item {
  font-size: 28px;
  letter-spacing: 0.2em;
  margin-top: 30px;
}

.solve-item-sub {
  font-size: 28px;
  color: #3DAB3B;
}

.solve-title {
  font-size: 24px;
  letter-spacing: 0.1em;
  margin-left: -1px;
  margin-top: 15px;
}

.solve-title-sub {
  font-weight: bold;
  color: #3DAB3B;
}

.solve-text {
  font-size: 20px;
  letter-spacing: 0.05em;
  line-height: 0.01;
  margin-top: 40px;
}

/*--------- スライドインアニメーション -------*/
.solve-feature-feature {
  position: relative;
  text-align: center;
  top: 5px;
  left: -500px;/* 初期位置：画面左外 */
  opacity: 0; 
  transition: left 1s, opacity 1s;
}

.slide-in {
  left: 0; /* スライドイン：画面内 */
  opacity: 1;
}
/*-------------------------------------------*/

.solve-feature {
  position: relative;
  text-align: center;
  margin-top: 30px;
}

.solve-feature1 {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 100px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.solve-feature-title {
  display: inline-block;
  font-size: 28px;
  letter-spacing: 0.2em;
  color: #FFFFFF;
  background-color: #0E74D2;
  padding: 20px 20px;
  border-radius: 4px;
  margin-bottom: 100px;
}

.solve-feature-title-sub {
  letter-spacing: 0.2em;
  color: #00FF19;
  
}

.solve-point {
  margin-right: 740px;
  margin-bottom: 20px;
}

.solve-featue-outer1 {
  position: relative;
  display: flex;
  justify-content: center;
}

.solve-featue-outer2 {
  position: relative;
  display: flex;
  justify-content: center;
  column-gap: 90px;
}

.solve-feature-outer3 {
  display: flex;
  justify-content: center;
  column-gap: 350px;
  margin-top: -60px;
}

.solve-feature-inner1 {
  position: relative;
  width: 240px;
  background-color: #f64949;
  text-align: center;
  padding: 30px 20px;
  border-radius: 4px;
  box-shadow: 3px 3px  5px rgba(0, 0, 0, 0.3);
}

.solve-feature-inner2 {
  position: relative;
  width: 240px;
  background-color: #3DAB3B;
  text-align: center;
  padding: 30px 20px;
  border-radius: 4px;
  box-shadow: 3px 3px  5px rgba(0, 0, 0, 0.3);
}

.solve-feature-inner3, .solve-feature-inner4 {
  position: relative;
  width: 240px;
  background-color: #3DAB3B;
  text-align: center;
  padding: 30px 20px;
  border-radius: 4px;
  box-shadow: 3px 3px  5px rgba(0, 0, 0, 0.3);
}

.solve-feature-inner5 {
  position: relative;
  width: 240px;
  background-color: #0E74D2;
  text-align: center;
  padding: 30px 20px;
  border-radius: 4px;
  box-shadow: 3px 3px  5px rgba(0, 0, 0, 0.3);
}

.solve-featue-menu {
  font-size: 22px;
  letter-spacing: 0.2em;
  color: #FFFFFF;
  margin-top: 20px;
}

.solve-featue-item {
  font-size: 16px;
  letter-spacing: 0.1em;
  color: #FFFFFF;
  margin-top: 20px;
  margin-bottom: 30px;
}

.object1 {
  margin-top: -60px;
  width: 150px;
  filter:drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.3));
}

.object2 {
  margin-top: -60px;
  width: 180px;
  filter:drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.3));
}

.object3 {
  margin-right: 20px;
  width: 160px;
  filter:drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.3));
}

.object4 {
  margin-right: 20px;
  width: 200px;
  filter:drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.3));
}

.object5 {
  margin-top: -60px;
  width: 220px;
  filter:drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.3));
}

/*---------- フェードインアニメーション ------------*/
.arrow1 {
  margin-top: 40px;
  margin-bottom: 30px;
  width: 80px;
  opacity: 0;
  transition: transform 1s, opacity 1s ease-in-out;
}

.arrow2 {
  width: 120px;  
  opacity: 0;
  transition: transform 1s, opacity 1s ease-in-out;
}

.arrow3 {
  margin-top: 30px;
  width: 120px;
  opacity: 0;
  transition: transform 1s, opacity 1s ease-in-out; 
}

.arrow4 {
  width: 120px;  
  opacity: 0;
  transition: transform 1s, opacity 1s ease-in-out;
}

.arrow5 {
  margin-bottom: 30px;
  width: 80px;
  opacity: 0;
  transition: transform 1s, opacity 1s ease-in-out; 
}

.arrowA {
  opacity: 1;
}

.arrowB {
  opacity: 1;
}

.arrowC {
  opacity: 1;
}

.arrowD {
  opacity: 1;
}

.arrowE {
  opacity: 1;
}
/*--------------------------------------------*/

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
