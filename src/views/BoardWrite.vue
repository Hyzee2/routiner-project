<template>
  <div class="modal-background" v-if="show" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>게시글 작성</h2>
      <form @submit.prevent="submitPost">
        <!-- 입력 폼 필드 -->
        <div>
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
            <button type="button" @click="showPostModal = false">취소</button>
          </div>
        </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean
  },
  data() {
    return {
      post: {
        title: '',
        content: '',
        tags: ''
      }
    };
  },
  methods: {
    submitPost() {
      // 게시글 등록 로직
      this.$emit('submitted');
    }
  }
}
</script>

<style>




.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

</style>