<template>
  <div>
    <ValidationProvider mode='lazy' v-slot="{ errors }" rules="email|required">
      <label for="email">Email</label>
      <input v-model="email" name="メールアドレス" placeholder="test@example.com" :class="{ 'has-error': errors.length > 0 }" />
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
      email: this.value,
    }
  },
  watch: {
    // ローカルデータが変更された場合、親コンポーネントにデータを送信
    email(newEmail) {
      this.$emit('input', newEmail);
    },
  },
}
</script>

<style scoped>
label {
  font-size: 16px;
  margin-right: 340px;
  line-height: 2.0;
  letter-spacing: 0.05em;
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
