<template>
  <div>
    <ValidationProvider mode='lazy' v-slot="{ errors }" rules="required">
      <label for="name">Name</label>
      <input v-model="name" name="名前" placeholder="山田　太郎" :class="{ 'has-error': errors.length > 0 }"/>
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
      name: this.value, // 親から受け取ったデータをローカルデータに設定
    }
  },
  watch: {
    // ローカルデータが変更された場合、親コンポーネントにデータを送信
    name(newName) {
      this.$emit('input', newName);
    },
  },
}

</script>

<style scoped>
label {
  font-size: 16px;
  margin-right: 350px;
  line-height: 2.0;
  letter-spacing: 0.08em;
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

.has-success {
  
  background: lightgreen; /* 成功時の背景色 */
  color: green; /* 成功時のテキスト色 */
}
</style>
