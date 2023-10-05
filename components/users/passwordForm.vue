<template>
  <div>
    <ValidationProvider mode='lazy' v-slot="{ errors }" rules="min:8|max:16|required|password">
      <label for="password">パスワード</label>
      <div class="password-area">
        <input class="password-input" :type="inputType" v-model="password" name="パスワード" placeholder="半角英数字（8～16字以内）" :class="{ 'has-error': errors.length > 0 }" />
        <span class="password-click" @click="onClick">
          <font-awesome-icon :icon="showPassword ? ['fas', 'eye'] : ['fas', 'eye-slash']" class="password-icon"/>
        </span>
      </div>
      <div class="message">
        <span class="error-message">{{ errors[0] }}</span>
      </div>
    </ValidationProvider>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  props: {
    value: String, // 親コンポーネントから受け取るデータ
  },
  data() {
    return {
      password: this.value,
      showPassword: false,
    }
  },
  watch: {
    // ローカルデータが変更された場合、親コンポーネントにデータを送信
    password(newPassword) {
      this.$emit('input', newPassword);
    },
  },

  components: {
    FontAwesomeIcon,
    
  },

  computed: {
    inputType: function () {
      return this.showPassword ? "text" : "password";
    },
  },

  methods: {
    onClick: function() {
      this.showPassword = !this.showPassword;
    },
  },
}
</script>

<style scoped>
label {
  font-size: 16px;
  margin-right: 300px;
  line-height: 2.0;
  letter-spacing: 0.05em;
}
.password-area {
  display: flex;
}

.password-input {
  position: relative;
  z-index: 1;
}

.password-click {
  position: absolute;
  z-index: 2;
  margin-top: 14px;
  margin-left: 360px;
  cursor: pointer;
}

.password-icon {
  color: #6e6c6c;
  cursor: pointer;
}

.message {
  text-align: left;
  margin: 0 auto;
  height: 30px;
  margin-left: 5px;
}

.error-message {
  width: 100%;
  font-size: 14px;
  color: #ff0000;
}

.has-error {
  background: #f9c6c6;
}

</style>
