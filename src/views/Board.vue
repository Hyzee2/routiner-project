<template>
    <h1>Hello</h1>
    게시판 영역
    게시판(Bold 처리) | 돌아가기(UserMain.vue)

    글쓰기 버튼 만들기 -> 글편집으로 라우터 넘겨(EditBoard.vue)
    건강 / 셀프케어/ 생활/ 자기계발 -> 각각 서버에서 데이터 끌고와서 v-for문으로 쭈루룩 만들기
    얘를 라우터로 연결

    각각 컴포넌트 안에는 게시판 글 내용 서버에서 가져오기
    글 내용은 모달 창으로 보여주기 

    로그인Id랑 작성자 Id가 동일하면
    수정. 삭제 버튼이 true로 보여짐

    수정 버튼 누르면 글편집으로 라우터 넘겨(editBoard.vue)<br><br>
    <button @click = "btn_ev">글나와라얍</button>
</template>
  
<script>
import axios from 'axios';
  export default {
    name: 'App',
    data() {
      return {
      }
    },
    methods:{
      btn_ev(){
        let obj = {};
            axios.get("http://localhost:3000/query", obj)
            .then(res =>{
                console.log(res.data);
            })
      }
    },
    components: {
    }
  }
</script>
  
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>