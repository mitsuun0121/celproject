<template>
  <header>
    <h1 class="title">{{ $route.name }}</h1>
    <nav class="nav">
      <ul class="menu-group">
        <li class="menu-item" v-if="!$auth.loggedIn">
          <NuxtLink to="/register">Register</NuxtLink>
        </li>
        <li class="menu-item" v-if="!$auth.loggedIn">
          <NuxtLink to="/login">Login</NuxtLink>
        </li>
        <li class="menu-item" v-else>
          <a @click="logout">Logout</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        await this.$auth.logout();
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
header {
  display: flex;
  height: 100px;
  padding: 0 50px;
  margin-bottom: 30px;
  background-color: darkgray;
  align-items: center;
}
.title {
  margin-right: auto;
}
.menu-item {
  list-style: none;
  display: inline-block;
  padding: 10px;
}
.menu-item a {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
