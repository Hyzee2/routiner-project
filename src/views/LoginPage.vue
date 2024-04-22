<template>
  <nav>
    <router-link to="/">Home</router-link>
    <!-- 라우터로 Home 메뉴를 누르면 LoginPage가 보이게 만들었으므로 컴포넌트로 import 할 필요가 없다. -->
  </nav>
  
  <main>
    <div class="login-container">
      <label id="userId">아이디&nbsp;
        <input type="text" placeholder="아이디를 입력하세요" v-model="inputId">
      </label><br>
      <label id="password">비밀번호&nbsp;
        <input type="password" placeholder="비밀번호를 입력하세요" v-model="inputPw" />
      </label><br>
      <button @click="goLogin()">LOGIN</button>&nbsp;&nbsp;
      <button @click="goToJoin()">JOIN</button><br><br>
      <a id ="kakao-login-btn" @click = "kakaoLogin()">
        <img src = @/assets/kakaoLogin.png width="222" />
      </a><br>

      <a id ="google-login-btn" @click = "googleLogin()">
        <img src = @/assets/googleLogin.png width="222" />
      </a>
      
    </div>
  </main>

</template>

<script>
import axios from 'axios';

export default ({
  data(){
    return {
      inputId: '',
      inputPw: ''
    };
  },
  methods: {
    goLogin() {
      
      let obj = {};
      obj.id = this.inputId;
      obj.pw = this.inputPw;

      axios.get("http://localhost:3000/query3", {
        params: obj
      }).then(res => {
        console.log(res.data);
        if(res.data.state !== "none"){
        alert('로그인 성공!');
        this.$router.push('/UserMain');
      }else{
        alert("로그인 실패!");
        return;
      }
      })

    },
    goToJoin() {
      this.$router.push('/Join');
    },

    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: 'profile_nickname, profile_image, account_email',
        success: this.getKakaoAccount,
      });
    },
    getKakaoAccount() {
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (res) => {
          console.log("정보갖고오기까진성공함");
          const kakao_account = res.kakao_account;
          const id = kakao_account.email; 
          const name = kakao_account.profile.nickname;

          let kakao = {id, name};
          console.log(kakao);
    
          axios.post('http://localhost:3000/kakao-member', kakao)
          .then(res => {
              console.log(res);
              this.$store.commit('setUser', kakao);
              this.$router.push('/UserMain');  // UserMain.vue 페이지로 네비게이션
          });
          alert("카카오톡으로 로그인되었습니다.");
          console.log("id", kakao.id);
          console.log("name", kakao.name);


        },
        fail: (error) => {
          console.log(error);
        },
      });
    },
    kakaoLogout() {
      if (!window.Kakao.Auth.getAccessToken()) {
        console.log("Not logged in.");
        return;
      }

      window.Kakao.Auth.logout((response) => {
        //로그아웃
        console.log("access token:", window.Kakao.Auth.getAccessToken());
        console.log("log out:", response);
      });
    },
  },
  computed: {
  user() {
        return this.$store.getters.getUser;  // user 객체 반환
    }
  }
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

main {
  width: 50%;
  margin: auto;
  margin-top: 50px;
}

.login-container>label {
  border-bottom: 1px solid lightblue;
  display: inline-block;
  width: max-content;
  margin: 10px;
  margin-left: auto;
  margin-right: auto;
  
}

button {
  margin-top: 25px;
}
</style>