<template>
  <!-- <div class="menu">
    <label @click="goMain">
      <h4>오늘</h4>
    </label>
    <label @click="goCalendar">
      <h4>월별</h4>
    </label>
    <label @click="goBoard">
      <h4>게시판</h4>
    </label>
  </div> -->

  <v-layout class="overflow-visible" style="height: 56px;">
    <v-app-bar-title
      v-model="value"
      color="teal"
      grow
      class="mt-5"
    >
      <v-btn size="large" variant="text" class="mr-7 ml-7" to="/UserMain">
        <v-icon>mdi-checkbox-marked-circle-outline</v-icon>&nbsp;

        Main
      </v-btn>

      <v-btn size="large" variant="text" class="mr-7 ml-7" to="/Calendar">
        <v-icon>mdi-calendar-check</v-icon>&nbsp;

        Monthly
      </v-btn>

      <v-btn size="large" variant="text" class="mr-7 ml-7" to="/Board">
        <v-icon>mdi-bulletin-board</v-icon>&nbsp;

        Board
      </v-btn>
      
    </v-app-bar-title>
  </v-layout>

  <div class="calendar-container">
    <br/>
    <table class="scriptCalendar">
      <thead>
        <tr>
          <td class="calendarBtn" @click="prevCalendar">&#60;&#60;</td>
          <td colspan="5">
            <span>{{ calYear }}</span>년
            <span>{{ calMonth }}</span>월
          </td>
          <td class="calendarBtn" @click="nextCalendar">&#62;&#62;</td>
        </tr>
        <tr>
          <td>일</td><td>월</td><td>화</td><td>수</td><td>목</td><td>금</td><td>토</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in calendarData" :key="index">
          <td v-for="(day, idx) in row" :key="idx" :style="getCellStyle(day)" @click="openModal(day)">
            {{ day }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

   <!-- 모달 창 -->
   <div class="modal" v-if="modalOpen">
  <div class="modal-content">
    <span class="close" @click="closeModal()">&times;</span>
    <p>선택한 날짜: {{ calMonth }}월 {{ selectedDate }}일</p>
    <!-- 여기에 모달 내용 추가 -->

    <!-- <div v-for="(item, index) in responseArray" :key="index">
  <template v-if="Array.isArray(item)">
    <div v-for="(data, dataIndex) in item" :key="dataIndex" class="event-item">{{ data.r_name }}</div>
  </template>
  <template v-else-if="item.r_id">
    <div class="event-item">{{ item.r_id }}</div>
  </template>
</div> -->
    <div v-for="(item, index) in responseArray" :key="index">
      <template v-if="Array.isArray(item)">
        <div v-for="(data, dataIndex) in item" :key="dataIndex" :class="['event-item', { 'checked': data.checkYn }]">{{ data.r_name }}</div>
      </template>
      <template v-else-if="item.r_id">
        <div class="event-item">{{ item.r_id }}</div>
      </template>
      
    </div>

  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: "CalendarView",
  data() {
    return {
      toDay: new Date(),
      nowDate: new Date(),
      selectedDate: '',
      modalOpen: false,
      nameObj: {},
      responseArray: [],
    };
  },
  computed: {
    calYear() {
      return this.toDay.getFullYear();
    },
    calMonth() {
      return this.autoLeftPad(this.toDay.getMonth() + 1, 2);
    },
    calendarData() {
      return this.buildCalendar();
    }
  },
  methods: {
    getUserId() {
      let userId = this.$store.getters.getUserList.id;
        console.log("캘린더의 userId는?? ", userId);
        this.nameObj.id = userId;
    },
    goMain(){
      this.$router.push('/UserMain');
    },
    goCalendar(){
      this.$router.push('/Calendar');
    },
    goBoard(){
      this.$router.push('/Board');
    },
    prevCalendar() {
      this.toDay = new Date(this.toDay.getFullYear(), this.toDay.getMonth() - 1, this.toDay.getDate());
    },
    nextCalendar() {
      this.toDay = new Date(this.toDay.getFullYear(), this.toDay.getMonth() + 1, this.toDay.getDate());
    },
    buildCalendar() {
      let doMonth = new Date(this.toDay.getFullYear(), this.toDay.getMonth(), 1);
      let lastDate = new Date(this.toDay.getFullYear(), this.toDay.getMonth() + 1, 0);
      let calendarData = [];

      let dom = 1;
      let daysLength = (Math.ceil((doMonth.getDay() + lastDate.getDate()) / 7) * 7) - doMonth.getDay();
      let rowData = [];

      for (let day = 1 - doMonth.getDay(); daysLength >= day; day++) {
        if (Math.sign(day) == 1 && lastDate.getDate() >= day) {
          rowData.push(this.autoLeftPad(day, 2)); // 여기서 수정
          if (dom % 7 == 0 || day === lastDate.getDate()) {
            calendarData.push(rowData);
            rowData = [];
          }
        } else {
          rowData.push(null);
        }
        dom++;
      }

      return calendarData;
    },
    autoLeftPad(num, digit) {
      if (String(num).length < digit) {
        num = new Array(digit - String(num).length + 1).join("0") + num;
      }
      return num;
    },
    getCellStyle(day) {
      return day ? {} : { visibility: 'hidden' };
    },
    
     // 모달 열기
     openModal(day) {
      this.selectedDate = day;
      this.modalOpen = true;
      console.log("모달 열었을때", this.nameObj.id);
      console.log(day);
      console.log(this.calMonth);
      console.log(2024+this.calMonth+day);

      let obj = {};
      obj.id = this.nameObj.id;
      obj.date = 2024+this.calMonth+day;

      axios.get("http://localhost:3000/select_calendar", {
        params: obj
      })
      .then(response => {
        console.log("캘린더 조회시", response.data);
        // 응답 데이터를 배열에 저장
        this.responseArray = response.data;
        console.log(this.responseArray);
       })
       .catch(error => {
          console.error("에러 발생:", error);
        });
     },
    // 모달 닫기
    closeModal() {
      this.modalOpen = false; 
    },
  },
  mounted() {
      this.getUserId();
    },
};
</script>

<style scoped>
.calendar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.menu {
  width: 100%;
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

a { color:#000000;text-decoration:none; }
.scriptCalendar { text-align:center; }
.scriptCalendar > thead > tr > td { width:50px;height:50px; }
.scriptCalendar > thead > tr:first-child > td { font-weight:bold; }
.scriptCalendar > thead > tr:last-child > td { background-color:#90EE90; }
.scriptCalendar > tbody > tr > td { width:50px;height:50px; }
.calendarBtn { cursor:pointer; } 

.modal {
  display: block; /* 모달 숨김 */
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .modal-content {
  background-color: #fefefe;
  margin: 12% auto;
  padding: 10px;
  border: 1px solid #888;
  width: 50%;
  height: 60%;
} */

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 10px;
  border: 1px solid #888;
  width: 30%; /* 모달 너비 조정 */
  height: 40%; /* 모달 높이 조정 */
  overflow-y: auto; /* 세로 스크롤 추가 */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer; /* 커서 스타일 지정 */
}

.event-item {
  border: 1px solid #ccc; /* 테두리 추가 */
  padding: 5px; /* 내부 여백 추가 */
  margin: 5px; /* 바깥 여백 추가 */
  border-radius: 20px; /* 모서리를 둥글게 설정 */
}

.checked {
  background-color: lightgreen; /* checkYn이 true인 경우 배경색 */
}

</style>
