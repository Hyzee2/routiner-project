<template>
  <v-sheet class="bg-grey-lighten-5 pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="500">
      <v-form class="join-form"
      >
        <p class="join-form-text">아이디</p>
        <v-text-field
          v-model="inputId"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          label="ID"
          placeholder="ID를 입력해주세요"
          clearable
        ></v-text-field>
        <p class="join-form-text">비밀번호</p>
        <v-text-field
          v-model="inputPw1"
          :readonly="loading"
          :rules="[required]"
          label="Password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          clearable
        ></v-text-field>
        <p class="join-form-text">비밀번호 확인</p>
        <v-text-field
          v-model="inputPw2"
          :readonly="loading"
          :rules="[required]"
          label="Password check"
          type="password"
          placeholder="비밀번호를 다시 한 번 입력하세요"
          clearable
        ></v-text-field>
        <p class="join-form-text">이름</p>
        <v-text-field
          v-model="inputName"
          :readonly="loading"
          :rules="[required]"
          label="Name"
          placeholder="이름을 입력해주세요"
          clearable
        ></v-text-field>
        <p class="join-form-text">생년월일</p>
        <v-text-field
          v-model="inputBirth"
          :readonly="loading"
          :rules="[required]"
          label="Birth"
          placeholder="YYYYMMDD 형식으로 입력해주세요"
          clearable
        ></v-text-field>

        <p class="btn-custom-font">- 관심분야를 선택해주세요 -</p><br>

        <v-radio-group v-model="favorite_id">
          <v-radio class="btn-custom-font" label="건강" value="1"></v-radio>
          <v-radio class="btn-custom-font" label="셀프케어" value="2"></v-radio>
          <v-radio class="btn-custom-font" label="생활" value="3"></v-radio>
          <v-radio class="btn-custom-font" label="자기계발" value="4"></v-radio>
        </v-radio-group>
        
        <v-btn
          :loading="loading"
          color="teal-lighten-4"
          
          class="btn login-btn-font login-btn mb-10"
          variant="elevated"
          
          @click="checkId"
        >
          회원가입하기
        </v-btn>

        <v-btn
          :loading="loading"
          color="deep-purple-lighten-4"
          class="btn login-btn-font login-btn mb-10"
          variant="elevated"
          
          @click="resetForm"
        >
          다시입력하기
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>

  <!-- <div class="table-container">
    <form name="joinform">
        <table :style="table">

            <tr>
                <td class="class2">아이디</td>
                <td>&nbsp;<input type="text" v-model="inputId">&nbsp;</td>
            </tr>

            <tr>
                <td class="class2">비밀번호</td>
                <td>&nbsp;<input type="password" v-model="inputPw1">&nbsp;</td>
            </tr>

            <tr>
                <td class="class2">비밀번호확인</td>
                <td>&nbsp;<input type="password" v-model="inputPw2">&nbsp;</td>
            </tr>

            <tr>
                <td class="class2">이름</td>
                <td>&nbsp;<input type="text" v-model="inputName" ></td>
            </tr>

            <tr>
                <td class="class2">생년월일</td>
                <td>&nbsp;<input type="text" v-model="inputBirth" style="width: 80px;">&nbsp;YYYYMMDD 형식으로 입력해주세요</td>
            </tr>

            <tr>
                <td class="class2">관심분야:</td>
                <td>
                  <input type="radio" name="favorite_id" v-model="favorite_id" value="1">건강
                    <input type="radio" name="favorite_id" v-model="favorite_id" value="2">셀프케어
                    <input type="radio" name="favorite_id" v-model="favorite_id" value="3">생활
                    <input type="radio" name="favorite_id" v-model="favorite_id" value="4">자기계발
                    </td>
            </tr>
        </table>
      </form>
    </div>
        <br>
            <input type="button" value="join" @click="checkId()">&nbsp;&nbsp;
            <input type="reset" value="reset" @click="resetForm()"> -->
          
</template>
  
<script>
import axios from 'axios';

  export default {
    name: 'App',
    data() {
      return {
        inputId: '',
        inputPw1: '',
        inputPw2: '',
        inputName: '',
        birth: '',
        favorite_id: '',
      }
    },
    components: {
    },
    methods: {
      checkId() {
        if(this.inputId.length == 0) {
          alert("아이디를 입력해주세요.");
        } else {
          this.checkPw();
        }
      },
      checkPw() {
        let pwleng1 = this.inputPw1.length;
        if(pwleng1 == 0) {
          alert("비밀번호를 입력해주세요.");
        } else if(this.inputPw1 != this.inputPw2) {
          alert("비밀번호가 일치하지 않습니다.")
        } else if(this.inputId == this.inputPw1) {
          alert("아이디와 비밀번호는 같을 수 없습니다.")
        } else {
          this.checkName();
        }
      },
      checkName() {
        if(this.inputName.length == 0) {
          alert("이름을 입력해주세요.");
        } else {
          this.checkBirth();
        }
      },
      checkBirth() {
        const birthPattern = /^[0-9]{8}$/;
        if(!this.inputBirth) {
          alert("생년월일을 입력해주세요."); 
        } else if(!birthPattern.test(this.inputBirth)) {
          alert("생년월일을 올바르게 입력해주세요.");
        } else {
          this.checkFavorite();
        }
      },
      checkFavorite() {
        if(!this.favorite_id) {
          alert("관심분야를 선택해주세요.");
        } else {
          this.insertMember();
        }
      },
      insertMember() {
        let obj = {};
        obj.id = this.inputId;
        obj.name = this.inputName;
        obj.password = this.inputPw1;
        obj.birthdate = this.inputBirth;
        obj.favorite_id = parseInt(this.favorite_id);

        axios.post("http://localhost:3000/routin_joinUs", obj)
            .then( res => {
            console.log(res);
            console.log(obj);
            alert("회원가입이 완료되었습니다.");
            this.$router.push({ path: '/' });
            return;
            })
            // .catch(error => {
            //   console.error("회원가입 도중 오류가 발생했습니다:", error);
            //   alert("회원가입 도중 오류가 발생했습니다. 다시 시도해주세요.");

              .catch(error => {
            if (error.response.status === 400) {
                alert(error.response.data);
            } else {
                console.error("회원가입 도중 오류가 발생했습니다:", error);
                alert("회원가입 도중 오류가 발생했습니다. 다시 시도해주세요.");
            }
            });
      },
      resetForm() {
        this.inputId = '';
        this.inputPw1 = '';
        this.inputPw2 = '';
        this.inputName = '';
        this.inputBirth = '';
        this.favorite_id = '';
      }
    },
  }
</script>
  
<style scoped>
@import '@/views/main.css';

  @font-face {
    font-family: 'GODOM';
    src: url('/vuetify-project/public/fonts/GODOM.TTF') format('truetype');
  }
  
  .btn {
  width: 140px;
  height: 45px;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
  }

  .login-btn {
  display: inline-block;
  margin-top: 50px;
  margin-bottom: 30px;
  }

  .login-btn-font {
    font-family: 'GODOM';
    font-size: 14pt;
    color: #2c3e50;
  }

  .btn-custom-font {
    font-family: 'GODOM';
    font-size: 16pt;
    color: #2c3e50;
  }

  .join-form-text {
    text-align: left;
    font-family: 'GODOM';
    font-size: 13pt;
    color: #2c3e50;
  }
</style>