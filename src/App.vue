<template>
  <!-- nav 없애고 아이디, 비번 텍스트필드 -->
  <!-- 로그인버튼, 회원가입버튼 -->
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/Join">Join</router-link> | 
    <router-link to="/Board">Board</router-link>
  </nav>
  <router-view/>
  <div>
    <img src="@/assets/logo1.png" alt="Logo" class="logo" />
  </div>
  <main>
    <div class="login-container">
      <input type="text" placeholder="아이디" /><br>
      <input type="password" placeholder="비밀번호" /><br>
      <button @click="goLogin()">LOGIN</button>&nbsp;&nbsp;
      <button @click="goToJoin()">JOIN</button><br>
    </div>
  </main>
</template>

<script>
export default ({
methods: {
  goLogin() {
    alert('일단 알럿창 생성!!');
  },
  goToJoin() {
    this.$router.push('/Join');
  }
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
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
