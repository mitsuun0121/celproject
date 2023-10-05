<template>
  <div>
    <div class="container">
      <p v-if="$auth.loggedIn">Name : {{ $auth.user.name }}</p>
    </div>
    
    <font-awesome-icon icon="eye-slash" />
    <font-awesome-icon icon="eye" />
    <a @click="logout">Logout</a>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  layout: 'default',
  
  components: {
    FontAwesomeIcon,
  },

  methods: {
    async logout() {
      try {
        await this.$auth.logout();
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  },
  
}
</script>

<style>
body {
  font-family: 'M PLUS 1p', sans-serif;
  font-family: 'Kosugi Maru', sans-serif;
  /*max-width: 1250px;
  margin: 0 auto;
  /*padding: 0 30px;*/
  
}
</style>
