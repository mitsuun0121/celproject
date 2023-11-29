<template>
  <div class="mv">
    <div class="mv-img"><span class="mv-text">無料カウンセリングお申込みフォーム</span></div>
  </div>
</template>

<script>
</script>

<style scoped>
.mv {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.mv-text {
  display: block;
  position: relative;
  top: 240px;
  z-index: 2; 
  text-align: center;
  font-size: 32px;
  color: #FFFFFF;
}

.mv-img {
  width: 80%;
  height: 500px;
  background-image: url("~@/assets/img/contact.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top -60px;
  
}

.mv-img::after {
  content: "";
  display: block;
  width: 80%;
  height: 150px;
  background: rgba(38, 141, 60, 0.5);
  position: absolute;
  top: 180px;
  z-index: 1;
}

</style>