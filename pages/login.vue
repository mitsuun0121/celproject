<template>
  <div>
 
  
  <ValidationObserver ref="loginserver">
    <div class="login">
      <div class="login-page">
        <div class="form">
          <p class="form-title">Login</p>
          <form @submit.prevent="login">
            <emailForm v-model="email" />
            <passwordForm v-model="password" />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  </ValidationObserver>
  </div>
</template>

<script>
import emailForm from '~/components/users/emailForm.vue'
import passwordForm from '~/components/users/passwordForm.vue'

export default {
  components: {
    emailForm,
    passwordForm,
    
  },

  layout: 'default',

  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    async login() {
      // バリデーションを実行
      const isValid = await this.$refs.loginserver.validate();

      if (isValid) {
        // バリデーションが成功した場合、ログインを試行
        try {
          await this.$auth.loginWith("laravelJWT", {
            data: {
              email: this.email,
              password: this.password,
            },
          });
          this.$router.push("/");
        } catch (error) {
          alert("メールアドレスまたはパスワードが間違っています");
        }
      }  
    }
  }, 
} 
</script>

<style>
.login {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  background: #E5EDE9;
}

.login-page {
  width: 100%;
  height: auto;
  margin-top: 80px;
}

.form {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding: 80px;
  text-align: center;
  background: #FFFFFF;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.form-title {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.1em;
  margin-top: -30px;
  margin-bottom: 40px;
}

.form input {
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  padding: 15px;
  box-sizing: border-box;
  font-size: 16px;
  letter-spacing: 0.1em;
}

.form button {
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  border-radius: 4px;
  padding: 15px;
  color: #FFFFFF;
  font-size: 16px;
  letter-spacing: 0.1em;
  cursor: pointer;
}

.form button:hover {
  background: #43A047;
}

.message {
  text-align: center;
  margin-top: 40px;
  margin-bottom: -20px;
  color: #1a1a1a;
  font-size: 16px;
  letter-spacing: 0.05em;
}

.message-a {
  margin-left: 20px;
  font-weight: bold;
  color: #4CAF50;
}
</style>
