<template>
  <!-- nav 없애고 아이디, 비번 텍스트필드 -->
  <!-- 로그인버튼, 회원가입버튼 -->
  <div>
    <img src="@/assets/logo1.png" alt="Logo" class="logo" />
  </div>

  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/Join">Join</router-link> | 
    <router-link to="/Board">Board</router-link>
  </nav>

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
}

nav a.router-link-exact-active {
  color: #42b983;
}

.logo {
  width: 300px;
  margin-top: 25px;
}

</style>
