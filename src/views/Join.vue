<template>
    <h1>Hello</h1>
    회원가입 영역<br>
    <form name="joinform">
        <table border="1" width="700" align="center" cellspacing="0" cellpadding="0">

            <tr>
                <td class="class2">아이디:</td>
                <td>&nbsp;<input type="text" id="inputId">&nbsp;4~12자의 영문 대소문자와 숫자로만 입력</td>
            </tr>

            <tr>
                <td class="class2">비밀번호:</td>
                <td>&nbsp;<input type="password" id="inputPw1">&nbsp;</td>
            </tr>

            <tr>
                <td class="class2">비밀번호확인:</td>
                <td>&nbsp;<input type="password" id="inputPw2">&nbsp;</td>
            </tr>

            <tr>
                <td class="class2">성함:</td>
                <td>&nbsp;<input type="text" id="inputName" ></td>
            </tr>

            <tr>
                <td class="class2">생일:</td>
                <td>&nbsp;<input type="text" id="birth" style="width: 80px;">&nbsp;YYYYMMDD 형식으로 입력해주세요</td>
            </tr>

            <tr>
                <td class="class2">관심분야:</td>
                <td>
                  <input type="radio" name="favorite_id" value="health">건강
                    <input type="radio" name="favorite_id" value="selfcare">셀프케어
                    <input type="radio" name="favorite_id" value="life">생활
                    <input type="radio" name="favorite_id" value="improve">자기계발
                    </td>
            </tr>
        </table>
      </form>
        <br>
            <input type="button" value="join" @click="checkId()">&nbsp;&nbsp;
            <input type="reset" value="reset" @click="resetForm()">
    
</template>
  
<script>
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
        alert("왜 안나와");
      },
      resetForm() {

      }
    },
  }
</script>
  
<style>
  /* #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  } */
</style>