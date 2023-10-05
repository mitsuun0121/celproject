<template>
  <div>
    <div class="container">
      <p v-if="$auth.loggedIn">Name : {{ $auth.user.name }}</p>
    </div>
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
        this.$router.push("/users/login");
      } catch (error) {
        console.log(error);
      }
    }
  },
}
</script>