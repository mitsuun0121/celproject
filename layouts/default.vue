<template>
  <div>
    <!-- アニメーション表示部分 -->
    <div v-if="showBackground" class="fiction-background"></div>
    <div v-if="showMessage" class="fiction-message fadeOut">
      <p>このサイトはフィクションです</p>
    </div>
    
    <!-- メインコンテンツ表示部分 -->
    <div v-if="!showMessage">
      <site-header />
      <main-visual />
      <worry />
      <Solve />
      <Price />
      <Coach />
      <!--<News />-->
      <site-footer />
    </div>
    <nuxt />
  </div>
</template>

<script>

import SiteHeader from '~/components/lpTops/SiteHeader.vue'
import MainVisual from '~/components/lpTops/MainVisual.vue'
import Worry from '~/components/lpTops/Worry.vue'
import Solve from '~/components/lpTops/Solve.vue'
import Price from '~/components/lpTops/Price.vue'
import Coach from '~/components/lpTops/Coach.vue'
//import News from '~/components/lpTops/News.vue'
import SiteFooter from '~/components/lpTops/SiteFooter.vue'

export default {
  components: {
    SiteHeader,
    MainVisual,
    Worry,
    Solve,
    Price,
    Coach,
    //News,
    SiteFooter,
    
  },

  data() {
    return {
      showBackground: true,
      showMessage: true,
    };
  },

  mounted() {
    // 3秒間アニメーションを表示した後にコンテンツを表示
    setTimeout(() => {
      this.showMessage = false;
      this.showBackground = false;
    }, 3000);
  },

}
</script>

<style>
body {
  font-family: "Kosugi Maru", "Roboto";
  margin: 0 ;
  padding: 0 ;
  
}

a {
  text-decoration: none;
  color: #333;
  transition: 0.3s;
  
}

a:hover {
  opacity: 0.8;
  cursor: pointer;
  
}

.fiction-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  
}

.fiction-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 24px;
  color: #fff;
  padding: 10px;
  background-color: #000000;
  animation: fadeOut 3.5s ease-in-out; /* フェードアウトのアニメーション */
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
