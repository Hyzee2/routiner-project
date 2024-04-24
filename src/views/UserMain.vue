<template>

  <v-layout class="overflow-visible" style="height: 56px;">
    <v-app-bar-title
      v-model="value" 
      grow
      class="mt-5"
    >
      <v-btn size="large" variant="tonal" color="teal" class="mr-7 ml-7" to="/UserMain">
        <v-icon>mdi-checkbox-marked-circle-outline</v-icon>&nbsp;

        Main
      </v-btn>

      <v-btn size="large" variant="tonal" color="teal" class="mr-7 ml-7" to="/Calendar">
        <v-icon>mdi-calendar-check</v-icon>&nbsp;

        Monthly
      </v-btn>

      <v-btn size="large" variant="tonal" color="teal" class="mr-7 ml-7" to="/Board">
        <v-icon>mdi-bulletin-board</v-icon>&nbsp;

        Board
      </v-btn>
      
    </v-app-bar-title>
  </v-layout>

  <h1 class="welcome btn-custom-title">{{ id }}님 루티너와 함께 오늘의 루틴을 실천해봐요!</h1>

  <v-card
    class="mx-auto mt-8"
    color="surface-variant"
    variant="text"
    >
    <v-img
      class="align-end text-white mb-5"
      height="500"
      :src="require('@/assets/teamwork.jpg')"
      cover
      >
      <div class="overlay"></div>
    </v-img>
  </v-card>

  <div class="popup_place" v-if="!routines || routines.length === 0">
    <div class="popup_wh">
      <h4 class="btn-custom-font">
        앗! 루틴이 없어요!<br> 
        루티너와 같이 새로운 루틴 만들러가요
      </h4>
      <button class="btn-custom-small" id="makeRoutine" @click="goRoutine">루틴만들기</button>
    </div>
  </div>

  <div class="total-list btn-custom-font">
    <v-row justify="center">
      <div class="list" v-if="isChecked === false">
        <div class="unchecked-list">

          <div v-for="li in routines" :key="li.r_name"  @click="checkRoutine(li)">
            <v-col cols="12" md="12" sm="12">
              <v-btn :class="{'checked' : li.checkYn}" rounded="lg" size="x-large" block>{{ li.r_name }}</v-btn>
            </v-col>
          </div>

        </div>
      </div>

      <div class="list" v-if="isChecked === true">
        <div class="checked-list">
          
          <div v-for="li in routines" :key="li.r_name"  @click="checkRoutine(li)">
            <v-col cols="12" md="12" sm="12">
              <v-btn :class="{'checked' : li.checkYn}" rounded="lg" size="x-large" block>{{ li.r_name }}</v-btn>
            </v-col>
          </div>

        </div>
      </div>
    </v-row>
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
        value: 1,
        id: '',
      }
    },
    methods: {
      goRoutine(){
        this.$router.push('/SelectRoutine');
      },

      loadRoutine(){ // 로그인한 id와 매칭하여 등록된 루틴 (join문) 배열로 가져오기 
        let userId = this.$store.getters.getUserList.id;
        this.id = this.$store.getters.getUserList.id;
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
  @import '@/views/main.css';

.welcome {
  margin-top: 40px;
  margin-bottom: -20px;
}

@font-face {
    font-family: 'GODOM';
    src: url('/vuetify-project/public/fonts/GODOM.TTF') format('truetype');
  }
  
  .btn-custom-font {
    font-family: 'GODOM';
    font-size: 18pt;
  }

  .btn-custom-title {
    font-family: 'GODOM';
    font-size: 25pt;
  }

  .btn-custom-small {
    font-family: 'GODOM';
    font-size: 14pt;
  }
</style>