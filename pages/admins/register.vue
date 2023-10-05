<template>
  <div>
    <ValidationObserver ref="registerserver">
      <div class="register">
        <div class="register-page">
          <div class="form">
            <p class="form-title">Counselor</p>
            <form @submit.prevent="register">
              <nameForm v-model="name" />
              <emailForm v-model="email" />
              <passwordForm v-model="password" />
              <button type="submit">register</button>
            </form>
          </div>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import nameForm from '~/components/users/nameForm.vue'
import emailForm from '~/components/users/emailForm.vue'
import passwordForm from '~/components/users/passwordForm.vue'

export default {
  components: {
    nameForm,
    emailForm,
    passwordForm

  },

  layout: 'default',

  auth: false,
  data() {
    return {
      name: null,
      email: null,
      password: null,
    };
  },
  methods: {
    async register() {
      // バリデーションを実行
      const isValid = await this.$refs.registerserver.validate();

      if (isValid) {
        // バリデーションが成功した場合、新規登録を実行
        try {
          await this.$axios.post("http://localhost/api/auth/admins/register", {
            name: this.name,
            email: this.email,
            password: this.password,
          });
          this.$router.push("/admins/admin");
  
        } catch (error) {
          alert("メールアドレスがすでに登録されています");
        }
      }
    }
  },
}
</script>

<style>
.register {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  background: #E5EDE9;
}

.register-page {
  width: 100%;
  height: auto;
  margin-top: 30px;
}

.form {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding: 70px;
  text-align: center;
  background: #FFFFFF;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.form-title {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.1em;
  margin-top: -30px;
}

.form input {
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  border-radius: 4px;
  
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
  margin-top: 30px;
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
