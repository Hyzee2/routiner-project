<template>
    <h1>Hello</h1>
    루틴 선택 영역
    루틴등록(bold처리) | 돌아가기(UserMain.vue)

    첫번째. 라우터로 만들기
    건강 / 셀프케어/ 생활/ 자기계발 -> 각각 컴포넌트.vue로 만들고
    얘를 라우터로 연결
    추가하기 버튼 누르면 체크한거 서버로 전송

    두번째. 버튼으로 만들기
    버튼 누르면 데이터 바인딩으로 v-for문 사용해서 루틴 항목들 보여주기 
    
</template>
  
<script>
  export default {
    name: 'App',
    data() {
      return {
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