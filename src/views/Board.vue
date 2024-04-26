<template>
  <v-layout class="overflow-visible" style="height: 56px;">
    <v-app-bar-title
      v-model="value"
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
    <v-btn @click="fetchBoardsByCategory(1)" class = "mt-5 mr-2 ml-2 mb-3 btn-custom-font cate-btn" :class="{ active: isActive1 }">건강</v-btn>
    <v-btn @click="fetchBoardsByCategory(2)" class = "mt-5 mr-2 ml-2 mb-3 btn-custom-font cate-btn" :class="{ active: isActive2 }">셀프케어</v-btn>
    <v-btn @click="fetchBoardsByCategory(3)" class = "mt-5 mr-2 ml-2 mb-3 btn-custom-font cate-btn" :class="{ active: isActive3 }">생활</v-btn>
    <v-btn @click="fetchBoardsByCategory(4)" class = "mt-5 mr-2 ml-2 mb-3 btn-custom-font cate-btn" :class="{ active: isActive4 }">자기계발</v-btn>
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
      <tr class = 'title-custom-font'>
        <td class='title'>글제목</td>
        <td class='title'>글쓴이</td>
        <td class='title'>등록일</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="li in boards" :key="li.board_num" @click="openModal(li.board_num)" :class="{ active: selectedCategory === categories }" >
        <td class='btn-custom-font board-content'>{{ li.title }}</td>
        <td class='btn-custom-font board-content'>{{ li.mem_id }}</td>
        <td class='btn-custom-font board-content'>{{ li.w_date }}</td>
      </tr>
    </tbody>
  </table>

  <v-dialog v-model="modalOpen" max-width="800">
    
      <v-card>
        <v-card-title class="detail-modal">
          <div class="view-top-title content-title-font"> {{ selectedPost.title }}<br><br></div>
          <div class="detail-content">
            <div class="content-writer-font">{{ selectedPost.mem_id }}</div> 
            <div class="view-top2 content-update-font">{{ selectedPost.w_date }}</div>
          </div>
            <!-- <span class = "view-bottom btn-custom-font"><button @click="modalOpen = false">Close</button></span><br> -->
        </v-card-title>

        <v-card-text>
          <div class="detail-content">
            <div class ="content-detail-font"> {{ selectedPost.contents }}</div>
          </div>
        </v-card-text>

        <!-- 여기 삭제버튼 -->
        <!-- <v-btn @click="boardId">온클릭</v-btn> -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="this.boardid === 'Y'"
            class="btn-custom-font modal-button"
            rounded="xl"
            @click="deleteContents"
          >삭제하기</v-btn>
        </v-card-actions>
    

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="btn-custom-font modal-button"
            rounded="xl"
            @click="modalOpen = false"
          >닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  <!-- 글쓰기 영역 -->
  <div>
    <v-btn @click="openedModal" class="btn-custom-font modal-button mb-16">글쓰기</v-btn>
  </div>

  <board-write :show="showPostModal" @close="showPostModal = false" @submitted="handleSubmitted"></board-write>

  <!-- 글쓰기 모달창 영역 -->
  <div class="Boardmodal" v-if="modalPopup">
    <div class="Boardmodal-content">
      <h2 class="Boardmodal-title">게시글 작성</h2>

      <div class="edit">
        <div class="edit-title">
          <label class="content-writer-font">제목</label>
          <input type="text" placeholder="제목을 입력하세요" class="inputTitle" v-model="inputTitle" required>
        </div>
      </div>

      <div class="edit">
        <div>
          <label class="content-writer-font edit-content">내용</label>
          <input type="textarea" placeholder="내용을 입력하세요" class="inputcontents" v-model="inputcontents" required>
        </div>
      </div>

      <div class="edit-buttons">
        <v-btn @click="insertBoard" class="btn-custom-font modal-button mr-4">등록</v-btn>
        <v-btn @click="closedModal" class="btn-custom-font modal-button ml-4">취소</v-btn>
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
      isActive1: false,
      isActive2: false,
      isActive3: false,
      isActive4: false,
      boardNum: '',
      boardid: '',
      boardYn: false,
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
      switch(cate_id){
        case 1:
          this.isActive1 = true;
          this.isActive2 = false;
          this.isActive3 = false;
          this.isActive4 = false;
          break;
        case 2:
          this.isActive1 = false;
          this.isActive2 = true;
          this.isActive3 = false;
          this.isActive4 = false;
          break;
        case 3:
          this.isActive1 = false;
          this.isActive2 = false;
          this.isActive3 = true;
          this.isActive4 = false;
          break;
        case 4:
          this.isActive1 = false;
          this.isActive2 = false;
          this.isActive3 = false;
          this.isActive4 = true;
          break;
      }
      axios.get('http://localhost:3000/boards/category/' + cate_id)
        .then(response => {
          this.boards = response.data.data; // 기존 상태 업데이트 로직
          console.log('자~ server 에서 data 왔는지 보자: ',response.data.data);
        
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
          this.boardNum = this.selectedPost.board_num;
          console.log("boardnumber는??", this.boardNum);
          this.boardId(this.boardNum);
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
          this.fetchBoardsByCategory(this.cateId);
          this.inputTitle = '';
          this.inputcontents = '';
        })
        .catch(error => {
          console.error("에러 발생:", error);
        });
    },

    deleteContents() {
      let obj = {};
      obj.id = this.userId;
      obj.boardNum = this.boardNum;

      axios.post("http://localhost:3000/delete_boards", obj)
      .then(response => {
        console.log(response.data);
        alert("글이 삭제되었습니다!");
        this.modalOpen = false;
        this.fetchBoardsByCategory(this.cateId);
      })
      .catch(error => {
          console.error("에러 발생:", error);
        });
    },

    boardId(num) {
      let obj = {};
      obj.id = this.userId;
      obj.boardNum = num;

      axios.get("http://localhost:3000/board_id", {
        params: obj
      })
      .then(response => {
          this.boardid = response.data.yn;
          // console.log("얍얍", response.data);
          // console.log("boardid", this.boardid);
          // if(this.boardid=='Y') {
          //   this.boardYn = true;
          // }
        })
        .catch(error => {
          console.error('Error fetching board details:', error);
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
@import '@/views/main.css';

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
  background-color: #00a493;
  color: white;
}

/* .modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
} */
.modal-content { /*글 상세 내용 모달*/ 
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
  margin-top: 10px;
  margin-bottom: 10px;
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
  animation: slideIn 0.5s;
}

@keyframes slideIn {
    from { transform: translateY(-50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

.Boardmodal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 10px;
  border: 1px solid #888;
  width: 30%; /* 모달 너비 조정 */
  height: 50%; /* 모달 높이 조정 */
  overflow-y: auto; /* 세로 스크롤 추가 */
}

.edit-buttons {
  margin-top: 40px;
}

.edit {
  display: flex;
  margin-left: 10px;
  margin-bottom: 10px;
}

.inputTitle {
  border-bottom: 1px solid #888;
  display: inline-block;
  margin-left: 20px;
  width: 200px;
  height: 30px;
  overflow: hidden;
}

.inputcontents {
  border: 1px solid #888;
  display: inline-block;
  margin-left: 20px;
  width: 400px;
  height: 200px;
  overflow: hidden;
}

.Boardmodal-title {
  font-family: 'GODOM';
  font-size: 25pt;
  margin-bottom: 10px;  /*제목 아래 여백 추가 */
  border-bottom: 3px solid #949292;  /*밑줄 추가 */
  padding-bottom: 5px;  /*밑줄과 제목 사이 간격 추가 */
  margin-bottom: 50px;  /*밑줄 아래 여백 추가 */
}

.cate-btn {
  padding: 5px 20px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.brd_table {
    width: 80%; /* 테이블의 폭 설정 */
    margin: 20px auto; /* 상하 20px, 좌우 자동으로 테이블을 중앙 정렬 */
    border-collapse: collapse; /* 테이블 셀 사이의 간격 없애기 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 테이블에 그림자 효과 추가 */
    overflow: scroll;
    white-space: nowrap; /* 텍스트를 한 줄로 표시 */
    text-overflow: ellipsis; /* 넘치는 텍스트를 '...'로 표시 */
}

.brd_table td.title, td.writer, td.update{
    width: 70%;
    background-color: #80cbc4;
    color: #eeeeee;
}

.brd_table tr:hover {
    background-color: #f5f5f5; /* 행에 마우스를 올리면 배경색 변경 */
    cursor: pointer;
  }

.title-custom-font {
  font-family: 'GODOM';
  font-size: 18pt;
}

.content-title-font {
  font-family: 'GODOM';
  font-size: 25pt;
  border-bottom: 1px solid #2c3e50;
}

.content-writer-font {
  font-family: 'GODOM';
  font-size: 15pt;
  display: inline-block;
  margin-right: auto;
  margin-left: 0;
}

.content-detail-font {
  font-family: 'GODOM';
  font-size: 15pt;
  display: inline-block;
  margin-right: auto;
  margin-left: 50px;
}

.content-update-font {
  font-family: 'GODOM';
  font-size: 10pt;
  display: inline-block;
  width: min-content;
  margin-right: 0;
  margin-left: auto;
}

.detail-modal {
  padding: 50px;
}

.detail-content {
  align-items: center;
  justify-content: center;
  display: flex;
}

tr.title, td.board-content {
    padding: 12px 15px; /* 셀 내부의 여백 */
    border-bottom: 1px solid #ddd; /* 셀 하단에 선 추가 */
    text-align: center; /* 텍스트를 중앙 정렬 */
}

.modal-background {
    position: fixed; /* 화면에 고정 */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6); /* 반투명 배경 */
    display: flex; /* flexbox로 중앙 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
    justify-content: center; /* 수평 중앙 정렬 */
    z-index: 1000; /* 다른 요소 위에 표시 */
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

.modal-button {
  height: 50px;
  font-size: 15pt;
  color: #ffffff;
  background: #7e57c2;
  width: 100px;
}
</style>