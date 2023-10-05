<template>
  <div>
    <h2>ログイン状態:{{ $auth.loggedIn }}</h2>
    <p>{{ $auth.user }}</p>
    <a @click="logout">Logout</a>
  </div>
</template>

<script>
export default {
  
  layout: 'default',


  methods: {
    async logout() {
      try {
        await this.$auth.logout();
        this.$router.push("/admins/login");
      } catch (error) {
        console.log(error);
      }
    }
  },
}
</script>

<style>
</style>
