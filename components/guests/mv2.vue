<template>
  <div class="mv">
    <div class="mv-img"><span class="mv-text">Thanks</span></div>
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
  top: 250px;
  z-index: 2; 
  text-align: center;
  font-size: 90px;
  letter-spacing: 0.3em;
  color: #FFFFFF;
}

.mv-img {
  width: 80%;
  height: 550px;
  background-image: url("~@/assets/img/thanks.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top -30px;
}
</style>