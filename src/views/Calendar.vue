<template>
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
        <!-- <button @click="closeModal">닫기</button> -->
        <span class="close" @click="closeModal()">&times;</span>
        <p>선택한 날짜: {{ selectedDate }}일</p>
        <!-- 여기에 모달 내용 추가 -->
      </div>
    </div>
</template>

<script>
export default {
  name: "CalendarView",
  data() {
    return {
      toDay: new Date(),
      nowDate: new Date(),
      selectedDate: '',
      modalOpen: false,
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
          rowData.push(day);
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

     },
    // 모달 닫기
    closeModal() {
      this.modalOpen = false; 
    },
  }
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
}

.modal-content {
  background-color: #fefefe;
  margin: 12% auto;
  padding: 10px;
  border: 1px solid #888;
  width: 50%;
  height: 60%;
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
</style>
