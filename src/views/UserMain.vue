<template>

  <nav class="menu">
    <router-link to="/UserMain">오늘</router-link>
    <router-link to="/Calendar">월별</router-link>
    <router-link to="/Board">게시판</router-link>
  </nav>

  <div class="popup_place" v-if="!routines || routines.length === 0">
    <div class="popup_wh">
      <h4>
        앗! 루틴이 없어요!<br> 
        루티너와 같이 새로운 루틴 만들러가요
      </h4>
      <button id="makeRoutine" @click="goRoutine">루틴만들기</button>
    </div>
  </div>

  <div class="list" v-if="isChecked === false">
    <div class="unchecked-list">

      <div v-for="li in routines" :key="li.r_name"  @click="checkRoutine(li)">
        <v-col cols="12" md="4" sm="6">
          <v-btn :class="{'checked' : li.checkYn}" rounded="lg" size="x-large" block>{{ li.r_name }}</v-btn>
        </v-col>
      </div>

    </div>
  </div>

  <div class="list" v-if="isChecked === true">
    <div class="checked-list">
      
      <div v-for="li in routines" :key="li.r_name"  @click="checkRoutine(li)">
        <v-col cols="12" md="4" sm="6">
          <v-btn :class="{'checked' : li.checkYn}" rounded="lg" size="x-large" block>{{ li.r_name }}</v-btn>
        </v-col>
      </div>

    </div>
  </div>

</template>
  
<script>
  import axios from 'axios';

  export default {
    name: 'App',
    data() {
      return {
        showModal: false,
        routines: [],
        result: {},
        isChecked: false,
      }
    },
    methods: {
      goRoutine(){
        this.$router.push('/SelectRoutine');
      },

      loadRoutine(){ // 로그인한 id와 매칭하여 등록된 루틴 (join문) 배열로 가져오기 
        let userId = this.$store.getters.getUserList.id;
        console.log(userId + "이건 usermain 화면에서 나온거"); // 로그인한 id 가지고 옴

        let obj = {}; // obj에 userId 담아서 DB에서 검색할 조건 값으로 보내기
        obj.mem_id = userId;

        axios.get("http://localhost:3000/RoutineList", {
          params: obj
        })
        .then(res => {
          console.log("이제 아래쪽에 data 나온 것임");
          console.log(res.data);
          console.log("이제 밑에 r_id, r_name이 나옴");
          console.log(res.data.data[0]);
          
          this.routines = res.data.data; 
          for(let i=0; i<this.routines.length; i++){
            if(this.routines[i].checkYn !== 1){
              this.isChecked=false;
            }else{
              this.isChecked=true;
            }
          }
        })
        .catch(error => {
          console.error("루틴정보 없거나 불러오기 실패", error);
        })
      },
      checkRoutine(li){ // 루틴 체크하는 순간 DB로 보내기 
        li.checkYn = !li.checkYn; // true, false
        this.isChecked = li.checkYn; // 지금 이부분 추가했는데 db 괜찮은지 확인하기!!!!!!!!!

        let userId = this.$store.getters.getUserList.id;

        let obj = {};
        obj.mem_id = userId;
        obj.r_id = li.r_id;
        obj.checkYn = li.checkYn;
        console.log("체크하고 나서 obj 확인", obj);
       
        axios.get("http://localhost:3000/check-select", {
          params: obj
        })
        .then(res => {
          console.log("이건 이미 체크를 했는지 찾아온 결과", res.data);
          this.result = res.data;
          console.log("이건 서버로부터 res를 받은 결과물", this.result);

          // 비동기 처리를 방지하기 위한 if 조건문 다음에 위치
          if(this.result.state === 'ok'){ // 이미 체크여부가 있으므로 update
            console.log("이건 쿼리가 있는지 없는지 확인", this.result.state);
            axios.post("http://localhost:3000/check-update", obj)
            .then(res => {
              console.log("이건 제대로 반응이 온것");
              console.log(res);
            })
          }else if(this.result.state === 'none'){ // 처음 체크하는 거니깐 insert
            axios.post("http://localhost:3000/check-insert", obj)
            .then(res => {
              console.log("이건 제대로 반응이 온것");
              console.log(res);
            })
          }
        })
        .catch(error => {
          console.log("서버로부터 정보를 가져오는데 실패", error);
        })
      }
    },

    components: {
    },

    mounted(){
      this.loadRoutine();
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

  menu>a {
    display: inline-block;
    width: 100px;
  }

  a {
    border-bottom: 1px solid lightblue;
    margin-left: 10px;
    margin-right: 10px;
  }

  a:hover {
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

  #makeRoutine { /*루틴만들기 버튼 스타일*/ 
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

  @keyframes slideIn {
    from { transform: translateY(-50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .checked {
    background-color: #11943c;
    color: white;
  }

  .list {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .unchecked-list, .checked-list {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }

</style>