<template>
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
  <div>
    <!-- <button v-for="li in categories" :key="li.cate_id" @click="fetchBoardsByCategory(li.cate_id)">
      {{ li.cate_name }}
    </button> -->
    <button @click="fetchBoardsByCategory(1)" class = "btn-custom-font">건강</button>
    <button @click="fetchBoardsByCategory(2)" class = "btn-custom-font">셀프케어</button>
    <button @click="fetchBoardsByCategory(3)" class = "btn-custom-font">생활</button>
    <button @click="fetchBoardsByCategory(4)" class = "btn-custom-font">자기계발</button>
  </div>
  <div class="image_container">
  <v-img
      class="image-item"
      :src="require('@/assets/5.png')"
      cover
      >
      <div class="overlay"></div>
    </v-img>
    <v-img
      class="image-item"
      :src="require('@/assets/6.png')"
      cover
      >
      <div class="overlay"></div>
    </v-img>
    <v-img
      class="image-item"
      :src="require('@/assets/7.png')"
      cover
      >
      <div class="overlay"></div>
    </v-img>
    <v-img
      class="image-item"
      :src="require('@/assets/8.png')"
      cover
      >
      <div class="overlay"></div>
    </v-img>
  </div>
  <table class="brd_table">
    <thead>
      <tr class = 'btn-custom-font'>
        <th class='title'>제목</th>
        <th class='title'>ID</th>
        <th class='title'>작성일시</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="li in boards" :key="li.board_num" @click="openModal(li.board_num)" :class="{ active: selectedCategory === categories }" >
        <td class='title btn-custom-font'>{{ li.title }}</td>
        <td class='title btn-custom-font'>{{ li.mem_id }}</td>
        <td class='title btn-custom-font'>{{ li.w_date }}</td>
      </tr>
    </tbody>
  </table>
  <!-- 글 contents 보여주기 영역 -->
  <div class="modal-background" v-if="modalOpen">
  <div class="modal-content">
    <span class="view-top-title btn-custom-font"> {{ selectedPost.title }}&nbsp;&nbsp;&nbsp;&nbsp;{{ selectedPost.mem_id }}</span> 
    <span class="view-top2 btn-custom-font">{{ selectedPost.w_date }}</span><br><br><br>
    <span class ="view-mid btn-custom-font"> {{ selectedPost.contents }}</span><br>
    

    <span class = "view-bottom btn-custom-font"><button @click="modalOpen = false">Close</button></span><br>
  </div>
</div><br><br>
  <!-- 글쓰기 영역 -->
  <div class = "btn-custom-font"><button @click="openedModal">글쓰기</button></div>
  <board-write :show="showPostModal" @close="showPostModal = false" @submitted="handleSubmitted"></board-write>

<!-- 모달창 영역 -->
<div class="Boardmodal" v-if="modalPopup">
    <div class="Boardmodal-content">
      <h2>게시글 작성</h2>
      <label>제목</label>
      <input type="text" id="inputTitle" v-model="inputTitle" required>
      <label>내용</label>
      <input type="textarea" id="inputcontents" v-model="inputcontents" required>
      <button @click="insertBoard">등록</button>
      <button @click="closedModal">취소</button>
        <!-- 입력 폼 필드 -->
        <!-- <div>
            <label for="title">제목</label>
            <input type="text" id="title" v-model="post.title" required>
          </div>
          <div>
            <label for="content">내용</label>
            <textarea id="content" v-model="post.content" required></textarea>
          </div>
          <div>
            <label for="tags">태그</label>
            <input type="text" id="tags" v-model="post.tags" required>
          </div>
          <div class="form-actions">
            <button type="submit">등록</button>
            <button type="button" @click="closedModal">취소</button>
          </div> -->
    </div>
  </div>

</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  data() {
    return {
      boards: [],
      selectedPost: {},
      filteredBoards: [],
      selectedCategory: 1,
      categories: [
        { cate_id: 1, cate_name: '건강' },
        { cate_id: 2, cate_name: '셀프케어' },
        { cate_id: 3, cate_name: '생활' },
        { cate_id: 4, cate_name: '자기계발' }],
        modalOpen: false,
        modalPopup: false,
      showPostModal: false,
      inputTitle: '',
      inputcontents: '',
      userId: '',
      cateId: '',
    }
  },
  methods: {
    handleSubmitted() {
      this.showPostModal = false;
    },
    closedModal() {
      this.modalPopup = false;
    },
    openedModal() {
      this.modalPopup = true;
    },

    fetchBoardsByCategory(cate_id) {
      this.cateId = cate_id;
      console.log("카테고리 아이디가 오나 안오나", cate_id);
      axios.get('http://localhost:3000/boards/category/' + cate_id)
        .then(response => {
          this.boards = response.data.data; // 기존 상태 업데이트 로직
          console.log('자~ server 에서 data 왔는지 보자: ',response.data.data)
        })
        .catch(error => {
          console.error('Error fetching boards:', error);
        });
    },
    // 게시판에서 글 선택하면 모달로 글 내용 보여주는 메서드
    openModal(board_num) {
      this.modalOpen = true;
      axios.get(`http://localhost:3000/boards/num/${board_num}`)
        .then(response => {
          this.selectedPost = response.data.data[0];  // 데이터 배열에서 게시글 정보 추출
        })
        .catch(error => {
          console.error('게시글 상세 정보 가져오기 오류:', error);
        });
    },
    // 글쓰기
    writeMain() {
      axios.get('http://localhost:3000/boards_write')
        .then(response => {
          this.detail = response.data;
          this.modalOpen = true;
        })
        .catch(error => {
          console.error('Error fetching board details:', error);
        });
    },
    insertBoard() {
      let obj = {};
      obj.id = this.userId;
      obj.cate = this.cateId;
      obj.title = this.inputTitle;
      obj.contents = this.inputcontents;
      console.log("게시판에서 넘긴 오브젝트", obj);

      axios.post("http://localhost:3000/insert_boards", obj)
        .then(response => {
          console.log(response.data);
          this.closedModal();
        })
        .catch(error => {
          console.error("에러 발생:", error);
        });
    },
    getUserId() {
        let id = this.$store.getters.getUserList.id;
        console.log("게시판의 userId는?? ", id);
        this.userId = id;

    },

  },
  mounted() {
    this.fetchBoardsByCategory(1);
    this.getUserId();
  },
  components: {
  }
}
</script>

<style scoped>
@import '@/axios.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.active {
  /* 활성화 버튼 스타일 */
  background-color: #42b983;
  color: rgb(63, 114, 83);
}

.modal {
  display: block;
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
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.image_container {
  display: flex;
}

.image-item {
  flex-grow: 1;
  /* flex-basis를 0%로 설정하면 모든 이미지 요소가 균등하게 분배됩니다 */
  flex-basis: 0%;
  /* 각 이미지의 최소 너비와 높이를 설정합니다. 이 값들은 실제 사용 사례에 맞게 조정해야 합니다. */
  min-width: 200px; /* 또는 원하는 px 값으로 */
  margin: 0px; /* 이미지 사이의 간격 */
}

.btn-custom-font {
  font-family: 'GODOM';
  font-size: 16pt;
}

@font-face {
  font-family: 'GODOM';
  src: url('/vuetify-project/public/fonts/GODOM.TTF') format('truetype');
}

.Boardmodal {
  display: none; /* 모달 숨김 */
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

.Boardmodal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 10px;
  border: 1px solid #888;
  width: 30%; /* 모달 너비 조정 */
  height: 50%; /* 모달 높이 조정 */
  overflow-y: auto; /* 세로 스크롤 추가 */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center;  */
}

.Boardmodal-title1 {
  font-size: 24px; /* 제목의 글꼴 크기 설정 */
  font-weight: bold; /* 제목의 글꼴 두껍게 설정 */
  margin-bottom: 10px; /* 제목 아래 여백 추가 */
  border-bottom: 3px solid #949292; /* 밑줄 추가 */
  padding-bottom: 5px; /* 밑줄과 제목 사이 간격 추가 */
  margin-bottom: 50px; /* 밑줄 아래 여백 추가 */
}


</style>