<template>
  
  <router-link to="/">
      <img src="@/assets/logo1.png" alt="Logo" class="logo" />
  </router-link>

  <router-view />

</template>

<script>

export default ({
  
  methods: {
  
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  padding-top: 15px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.logo {
  width: 300px;
  margin-top: 25px;
}

</style>
