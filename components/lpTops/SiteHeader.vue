<template>
  <div>
    <header class="header">
      <div class="header-logo"><img src="~/assets/img/small-logo.png" alt="ロゴ小">
      </div>
      <nav class="header-nav">
        <ul class="header-nav__list">
          <li class="header-nav__item"><a class="header-nav__link" href="#Worry">こんなお悩みないですか？</a></li>
          <li class="header-nav__item"><a class="header-nav__link" href="#Solve">CELの解決方法</a></li>
          <li class="header-nav__item"><a class="header-nav__link" href="#Price">料金説明</a></li>
          <li class="header-nav__item"><a class="header-nav__link" href="#Coach">コーチ紹介</a></li>
          <router-link class="counseling-btn" :to="{ path: '/guests/contact' }">無料カウンセリングはこちら</router-link>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  mounted() {
    // アンカーリンクがクリックされたの際の処理
    document.querySelectorAll('.header-nav__link').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1); // アンカーの識別子
        const targetSection = document.getElementById(targetId);

        // アンカーセクションに遷移
        if (targetSection) {
          const offset = 200; // 表示位置を調整
          window.scrollTo({
            top: targetSection.offsetTop - offset,
            behavior: 'smooth'
          });
        }
      });
    });

    // リロードされたときにトップ画面表示
    window.addEventListener('load', () => {
      window.scrollTo(0, 0);
    });
  }
}
</script>

<style scoped>
.header {
  font-family: "Kosugi Maru";
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fffff4;
  height: 60px;
  padding: 60px 0;
}

.header-logo{
  width: 160px;
  min-width: 160px;
  margin-left: 30px;
}

.header-nav__list {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  list-style: none;
  column-gap: 10px;
}

.header-nav__item {
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
  letter-spacing: 0.05em;
  margin-right: 30px;
}

a.header-nav__link {
  position: relative;
  display: inline-block;
  text-decoration: none;
}

a.header-nav__link::after {
  position: absolute;
  bottom: -7px;
  left: 0;
  content: '';
  width: 100%;
  height: 2px;
  background: #3DAB3B;
  transform: scale(0, 1);
  transform-origin: left top;
  transition: transform .3s;
}

a.header-nav__link:hover::after {
  transform: scale(1, 1);
  opacity: 0.8;
}

.header-nav__link{
  color: #3DAB3B;
}

.header-nav__link-span {
  color: #f64949;
}

.counseling-btn {
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: 0.1em;
  background-color: #3DAB3B;
  padding: 25px 20px;
  border-radius: 40px;
  transition: 0.8s;
  margin-right: 30px;
}
</style>