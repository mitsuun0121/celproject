<template>
  <div>
    <div class="container">
      <h1 class="main-title">
        私たちChild Edu Laboratoryは、子どもたちの教育について<br>親世代が学ぶためのオンラインスクールです。 
      </h1>
      <div class="worry-section" id="Worry">
        <p class="worry-heading">こんなお悩みないですか？</p>
        <div class="worry-question">
          <img class="worry-couple" src="~/assets/img/think-color.png" alt="悩む夫婦">
          <img class="question" src="~/assets/img/question.png" ref="question" alt="クエスチョンマーク">
        </div>
      </div>
      <div class="worry-area">
        <div class="worry-group">
          <img class="worry-human" src="~/assets/img/worry-woman1.png" alt="悩む女性1">
          <div class="worry-balloon"></div>
          <div class="worry-item">
            <p class="worry-text" ref="worrytext1">念願の第1子で可愛くて仕方ないのですが、<br>不安なことが多すぎて、育てることが怖くなってきました。<br>何より自分自身に余裕がなくて、どうしたらいいか…。</p>
          </div>
        </div>
        <div class="worry-group">
          <div class="worry-item">
            <p class="worry-text" ref="worrytext2">長男が5歳になって自分でできることも増えてうれしい反面、<br>最近は中々私の言うことを聞いてくれません。叱っても言うことを<br>聞かないこともことも多くて、育て方が間違っているのかな？</p>
          </div>
          <div class="worry-balloon-re"></div>
          <img class="worry-human" src="~/assets/img/worry-woman2.png" alt="悩む女性2">
        </div>
        <div class="worry-group">
          <img class="worry-human" src="~/assets/img/worry-man.png" alt="悩む男性">
          <div class="worry-balloon"></div>
          <div class="worry-item">
            <p class="worry-text" ref="worrytext3">自分の父親が子育てに無関心だったこともあり、いざ自分が<br>父親になってみて、2歳の長女とどう接したらいいか分かりません。<br>子どもとはしっかり向き合っていきたいのですが…。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  mounted() {

    const options = {
      root: null, // 交差を検出する親要素またはビューポートを指定
      rootMargin: '0px', // 要素が画面内に1ピクセルでも表示されたら交差が検出
      threshold: 0.5, // 50%以上表示されたらコールバックを実行
    };

    // 要素がビューポート内に表示されたらアニメーションを開始
    const observer = new IntersectionObserver(this.handleIntersection, options);
    const observer1 = new IntersectionObserver(this.handleIntersection, options);
    const observer2 = new IntersectionObserver(this.handleIntersection, options);
    const observer3 = new IntersectionObserver(this.handleIntersection, options);

    observer.observe(this.$refs.question);
    observer1.observe(this.$refs.worrytext1);
    observer2.observe(this.$refs.worrytext2);
    observer3.observe(this.$refs.worrytext3);
  },

  methods: {
    // 要素がビューポート内に表示されたらアニメーションを開始
    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // どの要素が交差しているかを判別
          if (entry.target === this.$refs.question) {
            this.startAnimation(this.$refs.question);
          } else if (entry.target === this.$refs.worrytext1) {
            this.startAnimation(this.$refs.worrytext1);
          } else if (entry.target === this.$refs.worrytext2) {
            this.startAnimation(this.$refs.worrytext2);
          } else if (entry.target === this.$refs.worrytext3) {
            this.startAnimation(this.$refs.worrytext3);
          }
        }
      });
    },
    // アニメーションの開始処理
    startAnimation(targetElement) {
      targetElement.classList.add('fade-up'); // classを追加
      targetElement.classList.add('fade-in');

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
}
.main-title {
  text-align: center;
  color: #3DAB3B;
  letter-spacing: 0.1em;
  line-height: 1.5;
  padding-top: 110px;
  margin: 0 auto;
}

.worry-question {
  position: relative;
  
}

/*--------- フェードアップアニメーション -------*/
.question {
  position: absolute;
  width: 120px;
  bottom: 40px;
  right: 15px;
  transition: bottom 1s ease-in-out, opacity 2s ease-in-out; /* 完了に2.5秒かかる */
  opacity:0;
}

.fade-up {
  bottom: 70px;
  opacity: 1;
}
/*----------------------------------------------*/

.worry-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
  margin-bottom: 90px;
  margin-left: 200px;
  column-gap: 50px;
}

.worry-heading {
  font-size: 28px;
  font-weight: bold;
  color: #3DAB3B;
  letter-spacing: 0.1em;
  line-height: 2.0;
  border-bottom: 4px solid #3DAB3B;
}

.worry-couple {
  width: 150px;
}

.worry-group {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 50px;
  padding-bottom: 90px;
}

.worry-human {
  width: 120px;
}

.worry-item {
  width: 650px;
  padding: 20px;
  background-color: #FFFFFF;
  border: 1px solid #b9b6b6;
  border-radius: 120px;
}

/*--------- フェードアップアニメーション -------*/
.worry-text {
  text-align: center;
  font-size: 20px;
  letter-spacing: 0.05em;
  line-height: 2.0;
  opacity: 0; /* 初期状態：非表示 */
  transform: translateY(30px); /* 初期状態：30px上昇 */
  transition: transform 1s, opacity 1s;
}

.fade-in {
  opacity: 1; 
  transform: translateY(0); /* 元の位置 */
}
/*----------------------------------------------*/

.worry-balloon {
  position: relative;
  content: "";
  left: 30px;
  width: 50px;
  height: 48px;
  bottom: -10px;
  background: #FFFFFF;
  border: 1px solid #b9b6b6;
  border-radius: 50%;
}

.worry-balloon:after {
  content: "";
  position: absolute;
  left: -50px;
  width: 32px;
  height: 30px;
  bottom: 30px;
  background: #FFFFFF;
  border: 1px solid #b9b6b6;
  border-radius: 50%;
}
.worry-balloon:before {  
  content: "";
  position: absolute;
  left: -80px;
  width: 16px;
  height: 14px;
  bottom: 60px;
  background: #FFFFFF;
  border: 1px solid #b9b6b6;
  border-radius: 50%;
}

.worry-balloon-re {
  position: relative;
  content: "";
  right: 30px;
  width: 50px;
  height: 48px;
  bottom: -10px;
  background: #FFFFFF;
  border: 1px solid #b9b6b6;
  border-radius: 50%;
}

.worry-balloon-re:after {
  content: "";
  position: absolute;
  right: -50px;
  width: 32px;
  height: 30px;
  bottom: 30px;
  background: #FFFFFF;
  border: 1px solid #b9b6b6;
  border-radius: 50%;
}
.worry-balloon-re:before {  
  content: "";
  position: absolute;
  right: -80px;
  width: 16px;
  height: 14px;
  bottom: 60px;
  background: #FFFFFF;
  border: 1px solid #b9b6b6;
  border-radius: 50%;
}

</style>