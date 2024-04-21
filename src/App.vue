<template>
  
  <div>
    <img src="@/assets/logo1.png" alt="Logo" class="logo" />
  </div>

  <nav>
    <router-link to="/">Home</router-link>
    <!-- 라우터로 Home 메뉴를 누르면 LoginPage가 보이게 만들었으므로 컴포넌트로 import 할 필요가 없다. -->
  </nav>
  <!-- 라우터 뷰 위에 부분은 페이지 이동해도 고정적으로 보이는 부분 -->
  <router-view />
  <!-- 이 부분은 라우터로 페이지 이동할 때마다 바뀌는 부분 -->

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
