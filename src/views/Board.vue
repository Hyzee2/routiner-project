<template>
  <nav class="menu">
    <router-link to="/UserMain">오늘</router-link>
    <router-link to="/Calendar">월별</router-link>
    <router-link to="/Board">게시판</router-link>
  </nav><br><br>
  <div>
    <!-- <button v-for="li in categories" :key="li.cate_id" @click="fetchBoardsByCategory(li.cate_id)">
      {{ li.cate_name }}
    </button> -->
    <button @click="fetchBoardsByCategory(1)">건강</button>
    <button @click="fetchBoardsByCategory(2)">셀프케어</button>
    <button @click="fetchBoardsByCategory(3)">생활</button>
    <button @click="fetchBoardsByCategory(4)">자기계발</button>
  </div>
  <table class="board_table">
    <thead>
      <tr>
        <th>제목</th>
        <th>ID</th>
        <th>작성일시</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="li in boards" :key="li.board_num" :class="{ active: selectedCategory === categories }" @click="openModal(li.board_num)">
        <td>{{ li.title }}</td>
        <td>{{ li.mem_id }}</td>
        <td>{{ li.w_date }}</td>
      </tr>
    </tbody>
  </table>
  <!-- 글 contents 보여주기 영역 -->
  <div v-if="modalOpen" class="modal-content">
    <p>Title: {{ selectedPost[0].title }}</p>
    <p>Contents: {{ selectedPost[0].contents }}</p>
    <p>Date: {{ selectedPost[0].w_date }}</p>
    <button @click="modalOpen = false">Close</button><br>
  </div><br><br>
  <!-- 글쓰기 영역 -->
  <button @click="showPostModal = true">글쓰기</button>
  <board-write :show="showPostModal" @close="showPostModal = false" @submitted="handleSubmitted"></board-write>
</template>

<script>
import axios from 'axios';
import BoardWrite from './BoardWrite.vue';
export default {
  name: 'App',
  data() {
    return {
      boards: [],
      selectedPost: null,
      filteredBoards: [],
      selectedCategory: 1,
      categories: [
        { cate_id: 1, cate_name: '건강' },
        { cate_id: 2, cate_name: '셀프케어' },
        { cate_id: 3, cate_name: '생활' },
        { cate_id: 4, cate_name: '자기계발' }],
      modalOpen: false,
      showPostModal: false
    }
  },
  methods: {
    handleSubmitted() {
      this.showPostModal = false;
    },

    // fetchBoards() {
    //   axios.get('http://localhost:3000/boards')
    //     .then(response => {
    //       this.boards = response.data;
    //       console.log('최초 mount되는 데이터는 이것입니다: '+response.data);
    //     })
    //     .catch(error => {
    //       console.error('Error fetching boards:', error);
    //     });
    // },


    // 선택한 카테고리에서 작성한 글만 나오게 하는 메서드
    // fetchBoardsByCategory(cate_id) {
    //   axios.get('http://localhost:3000/boards/' + cate_id)
    //     .then(response => {
    //       console.log(response);
    //       this.detail = response.data.data[0];
    //       console.log(this.detail);
    //     })
    //     .catch(error => {
    //       console.error('Error fetching board details:', error);
    //     });
    // },
    fetchBoardsByCategory(cate_id) {
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
          this.selectedPost = response.data.data;  // 데이터 배열에서 게시글 정보 추출
          console.log('server에서 가져온 contents내용',response.data.data);
          // this.title = this.selectedPost.title;
          console.log(this.selectedPost[0] );
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
    }
  },
  mounted() {
    this.fetchBoardsByCategory(1);
  },
  components: {
    BoardWrite
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

</style>