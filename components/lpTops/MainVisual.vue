<template>
  <div>
    <div class="container">
      <div class="mv"></div>
      <div class="mv-item">
        <p class="mv-text1">子育てのお悩み</p>
        <p class="mv-text2">聞かせてくれませんか？</p>
        <img class="heart" src="~/assets/img/heart.png" alt="ハート">
        <img class="biglogo" src="~/assets/img/big-logo.png" alt="ロゴ大">
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.container {
  font-family: "Kosugi Maru";
  display: flex;
  column-gap: 50px;
  width: 100%;
  height: auto;
  background-color: #fffff4;
}

.mv {
  width: 65%;
  height: 590px;
  background-image: url(~@/assets/img/main.jpg);
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
}

.mv-item {
  position: relative;
}

.mv-text1 {
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 0.2em;
  color: rgb(248, 135, 135);
  margin-top: 140px;
  animation-name:fadeInAnime;
  animation-duration:3s; /* 完了に3秒かかる */
  animation-delay: 0.5s; /* 0.5秒待機してから開始 */
  animation-fill-mode:forwards; /* 終了した時の状態を保持 */
  opacity:0;
}

.mv-text2 {
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 0.2em;
  color: rgb(248, 135, 135);
  animation-name:fadeInAnime;
  animation-duration:3s;
  animation-fill-mode:forwards;
  animation-delay: 1.5s;
  opacity:0;
}

.heart {
  position: absolute;
  top: 350px;
  width: 15%;
  right: 30px;
  animation-name:fadeInAnime;
  animation-duration:2.5s;
  animation-fill-mode:forwards;
  animation-delay: 2.5s;
  opacity:0;
}

@keyframes fadeInAnime{
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.biglogo {
  position: absolute;
  width: 90%;
  top: 340px;
  right: 10px;
}

</style>
