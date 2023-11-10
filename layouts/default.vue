<template>
  <div>
    <site-header />
    <main-visual />
    <worry />
    <Solve />
    <Price />
    <Coach />
    <!--<News />
    <site-footer />-->
      
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
//import SiteFooter from '~/components/lpTops/SiteFooter.vue'

export default {
  components: {

    SiteHeader,
    MainVisual,
    Worry,
    Solve,
    Price,
    Coach,
    //News,
    //SiteFooter
    
    
  }
}
</script>

<style>

body {
  font-family: "Kosugi Maru", "Roboto";
  margin: 0;
  padding: 0;
  
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

</style>
