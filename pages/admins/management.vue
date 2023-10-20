<template>
  <div>
    <div class="container">
      <h2>ログイン状態:{{ $auth.loggedIn }}</h2>
      <p v-if="$auth.loggedIn">Name : {{ $auth.user.name }}</p>
      <a @click="logout">Logout</a>
    </div>
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
    },
  },
}
</script>

<style>
</style>
