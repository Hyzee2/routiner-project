<template>
    <h1>Hello</h1>
    사용자 대시보드 영역

    오늘(UserMain.vue) | 월별(Calendar.vue) | 게시판(Board.vue)

    모달(false) -> mounted: 루틴 db 없으면 -> true로 바꿔서 루틴 만드는 모달 창 보여주기 
    -> '루틴만들기' 버튼 누르면 루틴생성 화면으로 넘어감(SelectRoutine.vue)
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