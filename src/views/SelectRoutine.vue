<template>

  <div><h class="btn-custom-font" style="font-size: 18pt; color: #2F2E2E;">
    <v-icon>mdi-account-circle</v-icon>{{ this.nameObj.id }}님께는 "{{ this.favorite }}" 카테고리의 루틴을 추천드려요!
  </h>
  </div>
   
  <div id="app">
    <nav class="navigation">
      <!-- <button class="btn-custom-font"
        v-for="(menu, index) in menus"
        :key="index"
        :class="{ 'selected': selectedMenu === menu }"
        @click="selectMenu(menu)"
      >
        {{ menu }}
      </button> -->
      <v-btn class="ma-2 btn-custom-font" height="50px" :ripple="false" rounded="xl"
      v-for="(menu, index) in menus"
        :key="index"
        :class="{ 'selected': selectedMenu === menu }"
        @click="selectMenu(menu)"
      >
      {{ menu }}
      </v-btn>
    </nav>

    <div class="content">

      <div v-if="selectedMenu === '건강'">
        <div class="button-list">
          <button class="btn-custom-font"
            v-for="(item, index) in menu1Items"
            :key="index"
            :class="{ 'selected': item.selected }"
            @click="toggleItem(item)"
          >
            {{ item.name }}
          </button><br>
          <v-btn class="ma-2 btn-custom-font" color="darkslateblue" height="50px" @click="insertRoutine" rounded="xl">
           내 루틴으로 추가하기
          </v-btn>
          <!-- <button style="background-color: darkslateblue; color:antiquewhite;" @click="insertRoutine">내 루틴으로 추가하기</button> -->
        </div>
      </div>

      <div v-else-if="selectedMenu === '셀프케어'">
        <div class="button-list">
          <button class="btn-custom-font"
            v-for="(item, index) in menu2Items"
            :key="index"
            :class="{ 'selected': item.selected }"
            @click="toggleItem(item)"
          >
            {{ item.name }}
          </button><br>
          <v-btn class="ma-2 btn-custom-font" color="darkslateblue" height="50px" @click="insertRoutine" rounded="xl">
           내 루틴으로 추가하기
          </v-btn>
          <!-- <button style="background-color: darkslateblue; color:antiquewhite;" @click="insertRoutine">내 루틴으로 추가하기</button> -->
        </div>
      </div>

      <div v-else-if="selectedMenu === '생활'">
        <div class="button-list">
          <button class="btn-custom-font"
            v-for="(item, index) in menu3Items"
            :key="index"
            :class="{ 'selected': item.selected }"
            @click="toggleItem(item)"
          >
            {{ item.name }}
          </button><br>
          <v-btn class="ma-2 btn-custom-font" color="darkslateblue" height="50px" @click="insertRoutine" rounded="xl">
           내 루틴으로 추가하기
          </v-btn>
          <!-- <button style="background-color: darkslateblue; color:antiquewhite;" @click="insertRoutine">내 루틴으로 추가하기</button> -->
        </div>
      </div>

      <div v-else-if="selectedMenu === '자기계발'">
        <div class="button-list">
          <button class="btn-custom-font"
            v-for="(item, index) in menu4Items"
            :key="index"
            :class="{ 'selected': item.selected }"
            @click="toggleItem(item)"
          >
            {{ item.name }}
          </button><br>
          <v-btn class="ma-2 btn-custom-font" color="darkslateblue" height="50px" @click="insertRoutine" rounded="xl">
           내 루틴으로 추가하기
          </v-btn>
          <!-- <button style="background-color: darkslateblue; color:antiquewhite;" @click="insertRoutine">내 루틴으로 추가하기</button> -->
        </div>
      </div>

    </div>

  </div>

  <div class="popup_place" v-if="okPopupOpen">
    <div class="popup_wh">
      <h4 class="btn-custom-font">
        루틴이 저장되었어요!
      </h4>
      <button class="btn-custom-small" id="makeRoutine" @click="gomain">루틴 시작하기</button>
    </div>
  </div>
    
</template>
  
<script>
import axios from 'axios';
  export default {
    name: 'App',
    data() {
      return {
        nameObj: {},
        selectObj: {},
        favorite: {},
        menus: ['건강', '셀프케어', '생활', '자기계발'],
        selectedMenu: '건강', // 디폴트로 선택된 메뉴
        okPopupOpen: false,
        menu1Items: [
          {name: '아침에 물 한잔', value: 1},
          {name:'영양제 챙겨먹기', value:2},
          {name:'하루 5천보 이상 걷기', value:3},
          {name:'저녁 2km 러닝', value:4},  
          {name:'하루 스쿼트 30개', value:5},
        ],
        menu2Items: [
          {name: '아침 명상하기', value: 6},
          {name:'하루 한 끼 가볍게 먹기', value:7},
          {name:'밥먹고 10분 산책하기', value:8},
          {name:'감사일기 쓰기', value:9},  
          {name:'선크림 바르기', value:10},
        ],
        menu3Items: [
          {name: '집에 들어와서 바로 씻기', value: 11},
          {name:'내일 입을 옷 준비해놓기', value:12},
          {name:'목표 시간에 눕기', value:13},
          {name:'침대에서 핸드폰 30분만 하기', value:14},  
          {name:'설거지 바로 하기', value:15},
        ],
        menu4Items: [
          {name: '출근길 뉴스레터 읽기', value: 16},
          {name:'오전 20분간 책읽기', value:17},
          {name:'저녁 전화영어', value:18},
          {name:'퇴근 후 15분 영어공부', value:19},  
          {name:'관심분야 콘텐츠 1개 공부', value:20},
        ],
        selectedItems: [],
      }
    },
    components: {
    },
    methods: {
      getUserId() {
        let userId = this.$store.getters.getUserList.id;
        console.log("userId는?? ", userId);
        this.nameObj.id = userId;

        let obj = {};
        obj.id = userId;

        // 여기부터
        axios.get("http://localhost:3000/select_favorite", {
          params: obj
        })
        .then( res => {
          console.log("이사람의 favorite_id는?", res.data.data);
          if (res.data.data==1) {
            this.favorite = '건강';
          } else if (res.data.data==2) {
            this.favorite = '셀프케어';
          } else if (res.data.data==3) {
            this.favorite = '생활';
          } else if (res.data.data==4) {
            this.favorite = '자기계발';
          } else {
            this.favorite = '모르겠어요';
          }
          this.selectedMenu = this.favorite;
          
        })
        .catch(error => {
          console.error("에러 발생:", error);
        });

      },
      selectMenu(menu) {
      this.selectedMenu = menu;
      this.selectedItems = []; // 메뉴가 변경될 때 선택된 항목 초기화
      },
      isSelected(value) {
      return this.selectedItems.includes(value);
      },
      toggleItem(item) {
      item.selected = !item.selected;
      },
      gomain() {
        this.$router.push('/UserMain');
      },
      insertRoutine() {
        let selectedItems;
        if (this.selectedMenu === '건강') {
          selectedItems = this.menu1Items.filter(item => item.selected);
        } else if (this.selectedMenu === '셀프케어') {
          selectedItems = this.menu2Items.filter(item => item.selected);
        } else if (this.selectedMenu === '생활') {
          selectedItems = this.menu3Items.filter(item => item.selected);
        } else if (this.selectedMenu === '자기계발') {
          selectedItems = this.menu4Items.filter(item => item.selected);
        }
        console.log('선택된 항목들:', selectedItems);
        console.log(this.nameObj);
        console.log(selectedItems[0].value);

        // 선택된 항목들의 정보를 배열로 구성하여 서버로 보냄
        const requestData = {
          id: this.nameObj.id,
          routines: selectedItems.map(item => item.value) // 선택된 항목들의 value로 배열 생성
        };

        // 서버로 데이터를 전송
        axios.post("http://localhost:3000/insert_selroutine", requestData)
        .then(response => {
          console.log(response.data);
          this.okPopupOpen = true;
        })
        .catch(error => {
          console.error("에러 발생:", error);
        });

      }

    },
    mounted() {
      this.getUserId();
    },
  }
</script>
  
<style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 5px;
  }

  .navigation {
    display: flex;
    justify-content: center; /* 가로 가운데 정렬을 위한 설정 */
    margin-bottom: 20px; /* 하단 여백 추가 */
  }

.navigation button {
  background-color: transparent;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.navigation button.selected {
  background-color: green;
  color: white;
}

.content {
  margin-top: 20px;
}

.menu {
  width: 100%;
  height: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-list {
  display: flex;
  flex-direction: column; /* 세로로 배치 */
  align-items: center; /* 가운데 정렬 */
}

.button-list button {
  margin: 5px;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.button-list button.selected {
  background-color: green;
  color: white;
  border-color: transparent; /* 선택되었을 때 테두리를 숨깁니다. */
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

  @font-face {
  font-family: 'GODOM';
  src: url('/vuetify-project/public/fonts/GODOM.TTF') format('truetype');
}

.btn-custom-font {
  font-family: 'GODOM';
  font-size: 16pt;
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