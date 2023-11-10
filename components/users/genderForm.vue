<template>
  <div>
    <ValidationProvider mode='lazy' v-slot="{ errors }" rules="required">
      <div class="gender-container">
        <label for="gender">性別</label>
        <input class="radio" type="radio" id="male" value="1" v-model="gender" name="性別" :class="{ 'has-error': errors.length > 0 }"><span class="radio-gender">男性</span>
        <input class="radio" type="radio" id="female" value="2" v-model="gender" name="性別" :class="{ 'has-error': errors.length > 0 }"><span class="radio-gender">女性</span>
      </div>
      <div class="message">
        <span class="error-message">{{ errors[0] }}</span>
      </div>
    </ValidationProvider>
  </div>
</template>

<script>
export default {
  props: {
    value: String, // 親コンポーネントから受け取るデータ
  },
  data() {
    return {
      gender: this.value,
    }
  },
  watch: {
    // ローカルデータが変更された場合、親コンポーネントにデータを送信
    gender(newGender) {
      this.$emit('input', newGender);
    },
  },
}
</script>

<style scoped>
.gender-container {
  display: flex;
  align-items: center;
  white-space: nowrap;
	width: fit-content;
	gap: 1rem;
}

label {
  font-size: 16px;
  line-height: 2.0;
  letter-spacing: 0.05em;
  margin-left: 7px;
}

.radio {
  margin-top: -2px;
}

.radio-gender {
  margin-left: -10px;
}
.message {
  text-align: left;
  margin: 0 auto;
  height: 30px;
  margin-left: 5px;
}

.error-message {
  font-size: 14px;
  color: #ff0000;
}

.has-error {
  background: #f9c6c6;
}
</style>
