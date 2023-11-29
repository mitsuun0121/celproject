<template>
  <div class="container">
    <mv2 />
    <div class="section">
      <step04 />
      <div class="thanks-outer">
        <div class="thanks-inner">
          <p class="thanks-number">STEP 04</p>
          <p class="thanks-text">お申込みが完了いたしました。</p>
        </div>
      </div>
    </div>
    <div class="thanks-item">
      <p class="thanks-item-text">本日はご予約いただきありがとうございました。<br>カウンセリング当日を心よりお待ちしております。</p>
    </div>
    <div class="btn-container">
      <router-link class="input-btn" :to="{ path: '/' }">トップページに戻る</router-link>
    </div>
    <site-footer />
  </div>
</template>

<script>
import mv2 from '~/components/guests/mv2.vue'
import step04 from '~/components/guests/step04.vue'
import SiteFooter from '~/components/lpTops/SiteFooter.vue'

export default {

  layout: 'guest',

  auth: false,
  
  components: {
    mv2,
    step04,
    SiteFooter,
    
  },
  
}

</script>

<style scoped>
.container {
  font-family: "Kosugi Maru";
  width: 100%;
  height: auto;
  background-color: #ebf8de;
}

.section {
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  background-color: #FFFFFF;
}

.thanks-outer {
  width: 80%;
  margin-left: 15%;
  padding-bottom: 20px;
}

.thanks-number {
  font-size: 24px;
  font-weight: bold;
  margin-top: 50px;
  
}

.thanks-text {
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.05em;
  margin-top: 20px;
  margin-bottom: 50px;
}

.thanks-item {
  text-align: center;
  margin-top: 70px;
}

.thanks-item-text {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.2em;
  line-height: 1.5;
  color: #3DAB3B;
}

.btn-container {
  text-align: center;
  margin-top: 100px;
  margin-bottom: 100px;
}

.input-btn {
  font-family: "Kosugi Maru";
  font-size: 22px;
  color: #FFFFFF;
  letter-spacing: 0.1em;
  background-color: #3DAB3B;
  border: none;
  padding: 25px 30px;
  border-radius: 40px;
  transition: 0.7s;
  cursor: pointer;
}

.input-btn:hover {
  opacity: 0.7;
}

</style>