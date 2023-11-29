<template>
  <ValidationObserver ref="loginserver">
    <div class="login">
      <div class="login-page">
        <div class="form">
          <p class="form-title">ログイン</p>
          <form @submit.prevent="login">
            <emailForm v-model="email" />
            <passwordForm v-model="password" />
            <button type="submit">ログイン</button>
          </form>
        </div>
      </div>
    </div>
  </ValidationObserver>
</template>

<script>
import emailForm from '~/components/users/emailForm.vue'
import passwordForm from '~/components/users/passwordForm.vue'

export default {
  components: {
    emailForm,
    passwordForm
  },

  layout: 'user',

  auth: false,

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {

    async login() {
      try {
        const responseUser = await this.$axios.get(`http://localhost/api/user/`);
        const userList = responseUser.data;

        const responseAdmin = await this.$axios.get(`http://localhost/api/admin/`);
        const adminList = responseAdmin.data;

        const isUser = userList.some(user => user.email === this.email);

        const isAdmin = adminList.some(admin => admin.email === this.email);

        if (isUser) {
          // laravelUserとしてログイン
          await this.$auth.loginWith('laravelUser', {
            data: {
              email: this.email,
              password: this.password,
            },
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('Login successful as laravelUser');
          this.$router.push('/users/management');

        } else if (isAdmin) {
          // laravelAdminとしてログイン
          await this.$auth.loginWith('laravelAdmin', {
            data: {
              email: this.email,
              password: this.password,
            },
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('Login successful as laravelAdmin');
          this.$router.push('/admins/management');
        } else {
          console.log('Invalid user or admin');
          alert('Invalid user or admin');
        }
      } catch (error) {
        console.error('ログインに失敗しました', error);
      }
    },

  }, 
} 
</script>

<style>
.login {
  font-family: "Roboto";
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  background: #ebf8de;
}

.login-page {
  width: 100%;
  height: auto;
  margin-top: 100px;
}

.form {
  position: relative;
  max-width: 520px;
  width: 100%;
  margin: 0 auto;
  padding: 60px;
  text-align: center;
  border-radius: 4px;
  background: #FFFFFF;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.form-title {
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 0.1em;
  margin-top: -20px;
  margin-bottom: 40px;
  padding-top: 20px;
}

.user-type {
  margin-bottom: 5px;
}
.user-type-select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #b6b6b6;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  background: #f2f2f2;
  margin-bottom: 30px; 
}

.user-type-select option {
  background-color: #fff;
  color: #333;
}

.user-type-select:hover {
  border-color: #555;
}

.form input {
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 1px solid #b6b6b6;
  border-radius: 4px;
  padding: 14px;
  box-sizing: border-box;
  font-size: 16px;
  letter-spacing: 0.1em;
}

.form button {
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  border-radius: 4px;
  margin-top: 30px;
  padding: 16px;
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
