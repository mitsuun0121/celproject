<template>
  <div>
    <div class="container">
      <div class="coach-section" id="Coach">
        <p class="coach-heading">コーチ紹介</p>
        <div class="coach-electric">
          <img class="coach-coach" src="~/assets/img/coach-color.png" alt="コーチング">
          <img class="electric1" src="~/assets/img/electric1.png" ref="bulb1" alt="電球マーク1">
          <img class="electric2" src="~/assets/img/electric2.png" ref="bulb2" alt="電球マーク2">
        </div>
      </div>

      <div class="coach-group">
        <img class="coach-number" src="~/assets/img/coach1.png" alt="コーチ1">
        <p class="coach-name">内山 亥雪<br>
        <span class="coach-text">以前は大学院生兼、講師として教員一筋の人生を奔走しておりました。<br>現在は日本の教育の未来をより良いものにするため、<br>Child Edu Laboratoryに入社し、教育に全力で向き合う最高のメンバー<br>たちと、日々日本の教育を改革しようと励んでおります。<br>「全ての人の100を引き出す」というMissionにこの身を一生捧げる覚悟で<br>毎日を過ごしています。</span></p>
      </div>

      <div class="coach-group">
        <img class="coach-number" src="~/assets/img/coach2.png" alt="コーチ1">
        <p class="coach-name">山田 セリ子<br>
        <span class="coach-text">大学院卒業後、臨床心理士の資格を生かし心理カウンセラーとして6年間<br>従事した後、Child Edu Laboratoryに入社してからは、コーチとして<br>5年のキャリアを持つ傍ら、日本の子供の教育についてのセミナーを定期的<br>に開催する等、活動の幅を広げ教育に対しての情熱は人一倍もっている<br>つもりです。私自身も13歳の息子と8歳の娘を持つ2児の母親として<br>子育てと仕事に奔走する日々を送っています。</span></p>
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
      threshold: 0.5, // 50%以上表示されたらコールバックを実行
    };

    // 要素がビューポート内に表示されたらアニメーションを開始
    const observer = new IntersectionObserver(this.handleIntersection, options);
    const observer1 = new IntersectionObserver(this.handleIntersection, options);
    
    observer.observe(this.$refs.bulb1);
    observer1.observe(this.$refs.bulb2);
  },

  methods: {
    // 要素がビューポート内に表示されたらアニメーションを開始
    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // どの要素が交差しているかを判別
          if (entry.target === this.$refs.bulb1) {
            this.startAnimation(this.$refs.bulb1);
          } else if (entry.target === this.$refs.bulb2) {
            setTimeout(() => {
              this.startAnimation(this.$refs.bulb2);
            }, 500);
          } 
        }
      });
    },
    // アニメーションの開始処理
    startAnimation(targetElement) {
      targetElement.classList.add('bulb1');
      targetElement.classList.add('bulb2');
    },
  }
}
</script >

<style scoped>
.container {
  font-family: "Kosugi Maru";
  width: 100%;
  height: auto;
  background-color: #ebf8de;
  padding-top: 140px;
}

.coach-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 230px;
  column-gap: 50px;
  margin-bottom: 80px;
}

.coach-heading {
  font-size: 28px;
  font-weight: bold;
  color: #3DAB3B;
  letter-spacing: 0.1em;
  line-height: 2.0;
  border-bottom: 4px solid #3DAB3B;
}

.coach-coach {
  width: 180px;
}

.coach-electric {
  position: relative;
}

.electric1 {
  position: absolute;
  top: -40px;
  left: 4px;
  transition: top 1s ease-in-out, opacity 2.5s ease-in-out; /* 完了に2.5秒かかる */
  opacity:0;
}

.bulb1 {
  top: -70px;
  opacity: 1;
}

.electric2 {
  position: absolute;
  top: -40px;
  left: 40px;
  transition: top 1s ease-in-out, opacity 2.5s ease-in-out; /* 完了に2.5秒かかる */
  opacity:0;
}

.bulb2 {
  top: -70px;
  opacity: 1;
}

.coach-group {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 120px;
}

.coach-number {
  position: absolute;
  margin-right: 820px;
}

.coach-name {
  font-size: 24px;
  letter-spacing: 0.05em;
  line-height: 1.5;
  padding: 40px;
  padding-left: 220px;
  margin-left: 100px;
  border-radius: 16px;
  background-color: #FFFFFF;
  box-shadow: 3px 3px  5px rgba(0, 0, 0, 0.3);
}

.coach-text {
  font-size: 18px;
  letter-spacing: 0.1em;
}

.btn-container {
  margin-top: 140px;
  padding-bottom: 140px;
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
