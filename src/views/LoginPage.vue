<template>
  
  <main>
    <div class="login-container bg-grey-lighten-5 pa-12">
      <v-form class="mt-16">
        <v-container fluid>
          <v-row justify="center">
            <v-col
              cols="12"
              lg="3"
              sm="4"
              >
              <v-text-field
                v-model="inputId"
                hide-details="auto"
                label="ID"
                placeholder="아이디를 입력하세요"
                type="ID"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-form>
        <v-container fluid>
          <v-row justify="center">
            <v-col
              cols="12"
              lg="3"
              sm="4"
              >
              <v-text-field
                v-model="inputPw"
                type="password"
                label="PW"
                placeholder="비밀번호를 입력하세요"
                
                name="input-10-1"
                
                
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    
      <div class="login-btn mb-10">
        <v-btn variant="elevated" class="btn login-btn-font" color="teal-lighten-4" @click="goLogin()">로그인</v-btn>
        <v-btn variant="elevated" class="btn login-btn-font" color="deep-purple-lighten-4" @click="goToJoin()">회원가입</v-btn>
      </div>

      <a class="autho" id ="kakao-login-btn" @click = "kakaoLogin()">
        <img class="autho-img kakao-img" src = @/assets/kakaoLogin.png width="222" />
      </a><br>

      <a class="autho" id ="google-login-btn" @click = "googleLogin()">
        <img class="autho-img google-img" src = @/assets/googleLogin.png width="222" />
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
      inputPw: '',
      show1: false,
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
        this.$store.commit('setUser', obj);
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
         

          let kakao = {id};
          console.log(kakao);
    
          axios.post('http://localhost:3000/kakao-member', kakao)
          .then(res => {
              console.log(res);
              this.$store.commit('setUser', kakao);
              this.$router.push('/UserMain');  // UserMain.vue 페이지로 네비게이션
          });
          alert("카카오톡으로 로그인되었습니다.");
          console.log("id", kakao.id);
          


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

<style scoped>
@import '@/views/main.css';

/* main {
  width: 30%;
  margin: 50px auto;
  
} */


.btn {
  width: 110px;
  height: 45px;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
}

.autho-img {
  width: 250px;
  
}

.kakao-img {
  height: 60px;
  border-radius: 50px;
}

.google-img {
  height: 60px;
}

.autho:hover {
  cursor: pointer;
}

.login-btn {
  display: block;
  margin-top: 50px;
  margin-bottom: 30px;
}

@font-face {
    font-family: 'GODOM';
    src: url('/vuetify-project/public/fonts/GODOM.TTF') format('truetype');
}
  
.btn-custom-font {
    font-family: 'GODOM';
    font-size: 16pt;
}

.login-btn-font {
    font-family: 'GODOM';
    font-size: 14pt;
    color: #2c3e50;
    display: inline-block;
}

</style>