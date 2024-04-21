<template>
    <!-- 모달(false) -> mounted: 루틴 db 없으면 -> true로 바꿔서 루틴 만드는 모달 창 보여주기 
    -> '루틴만들기' 버튼 누르면 루틴생성 화면으로 넘어감(SelectRoutine.vue) -->
  <div class="menu">
    <label @click="goMain">
      <h4>오늘</h4>
    </label>
    <label @click="goCalendar">
      <h4>월별</h4>
    </label>
    <label @click="goBoard">
      <h4>게시판</h4>
    </label>
  </div>
  <div class="popup_place" v-if="showModal">
    <div class="popup_wh">
      <h4>
        앗! 루틴이 없어요!<br> 
        루티너와 같이 새로운 루틴 만들러가요
      </h4>
      <button id="makeRoutine">루틴만들기</button>
    </div>
  </div>
</template>
  
<script>
  export default {
    name: 'App',
    data() {
      return {
        showModal: true
      }
    },
    methods: {
      goMain(){
        this.$router.push('/UserMain');
      },
      goCalendar(){
        this.$router.push('/Calendar');
      },
      goBoard(){
        this.$router.push('/Board');
      }
    },
    components: {
    },
    mounted(){
      setTimeout(function(){
        const dataFromServer = null;
        if(dataFromServer == null){
          this.showModal = true;
        }
      }, 1000);
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

  .menu {
    width: 100%;
    height: 40px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  label>h4 {
    display: inline-block;
    width: 100px;
  }

  label {
    border-bottom: 1px solid lightblue;
    margin-left: 10px;
    margin-right: 10px;
  }

  label:hover {
  transform: scale(1.2, 1.2);
  cursor: pointer;
}

  .popup_wh {
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    animation: slideIn 0.5s;
}

.popup_place {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
}

#makeRoutine {
  margin-top: 10px;
  background-color: rgb(218, 218, 218);
  padding: 5px 15px;
  border-radius: 5px;
  font-weight: 600;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3); /* 버튼에 그림자 효과 추가 */
  transition: background-color 0.3s, transform 0.2s; /* 배경색과 크기 변화에 애니메이션 효과 */
}

#makeRoutine:hover {
    background-color: #11943c; /* 호버 시 버튼 색 변경 */
    transform: scale(1.05); /* 버튼을 약간 크게 만듦 */
    color: white;
  }
</style>