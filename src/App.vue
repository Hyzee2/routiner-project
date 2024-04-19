<template>
  <!-- nav 없애고 아이디, 비번 텍스트필드 -->
  <!-- 로그인버튼, 회원가입버튼 -->
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/Login">Login</router-link> |
    <router-link to="/Join">Join</router-link> | 
    <router-link to="/Board">Board</router-link>
  </nav>
  <router-view/>
  메인 화면 영역
  아이디, 비번
  로그인 버튼, 회원가입 버튼 
</template>

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
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
