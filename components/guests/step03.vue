<template>
  <div class="step-container">
    <div v-for="(step, index) in steps" :key="index" class="step-area">
      <p class="step-number">STEP 0{{ index + 1 }}</p>
      <div :class="['circle', index === 2 ? 'custom-color-circle' : '']"><font-awesome-icon :icon="step.icon" class="step-icon" /></div>
      <p class="step-text">{{ step.message }}</p>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  components: {
    FontAwesomeIcon,

  },
  data() {
    return {
      steps: [
        { icon: ['fas', 'calendar-days'], message: '希望日時を選択' },
        { icon: ['fas', 'pen'], message: 'お客様情報を入力' },
        { icon: ['fas', 'list'], message: 'お客様情報を確認' },
        { icon: ['fas', 'check'], message: 'お申込み完了' },
      ]
    }
  }
}
</script>

<style>
.step-container {
  display: flex;
  justify-content: space-around;
  margin-top: 80px;
  margin-left: 100px;
  margin-right: 100px;
}

.step-area {
  width: 220px;
  margin-top: 50px;
}

.circle {
  width: 50px;
  height: 50px;
  background-color: #DFDEDE; 
  border-radius: 50%; 
  margin-left: auto;
  margin-right: auto;
}

.step-icon {
  margin-top: 13px;
  margin-left: 15px;
  font-size: 23px;
  color: #FFFFFF;
}

.step-number {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}
.step-text {
  margin-top: 20px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}
</style>

<style>
.custom-color-circle {
  background-color: #3DAB3B;
}
</style>
