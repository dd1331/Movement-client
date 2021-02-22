<template>
<div>
  <h2>게시판</h2>
  <v-container>
    <v-layout column="">
      <v-flex>
        <v-text-field
          label="Regular"
          placeholder="Placeholder"
          v-model="postInput.title"
        ></v-text-field>
      </v-flex>
      <v-flex>
        <v-textarea
          solo
          name="input-7-4"
          label="Solo textarea"
          v-model="postInput.content"
        ></v-textarea>
      </v-flex>
      <v-flex>
        <v-file-input
          accept="image/*"
          label="File input"
          ref="file" v-on:change="handleFileUpload()"
        ></v-file-input>
        <v-btn @click="submitFile">파일첨부</v-btn>
      </v-flex>
      <v-flex align-self-center>
        <v-btn @click="createOrUpdate">확인</v-btn>
        <v-btn>취소</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      postInput: {
        title: '',
        content: '',
      },
      file: '',

    };
  },
  computed: {
    updatePostInput() {
      return {
        ...this.postInput,
        id: this.activePost.id,
      };
    },
    user() {
      return this.$store.getters['auth/getAppUser'];
    },
    mode() {
      if (this.$route.params && this.$route.params.id) return 'update';
      return 'create';
    },
    activePost() {
      return this.$store.getters['post/getActivePost'];
    },
    currentCategory() {
      return this.$store.getters['common/getCurrentCategory'];
    },
  },
  methods: {
    async submitFile() {
      const formData = new FormData();

      formData.append('file', this.file);

      const res = await axios.post('http://localhost:3000/files/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      return res;
    },
    handleFileUpload() {
      const [file] = this.$refs.file.$refs.input.files;
      this.file = file;
      if (this.file.size > 1024 * 50) {
        this.file = '';
        alert('파일 크기를 초과하였습니다');
      }
    },
    async createOrUpdate() {
      if (this.mode === 'create') {
        const createPostInput = {
          ...this.postInput,
          poster: this.user.id,
          category: this.currentCategory.title,
        };
        if (this.file) {
          const { data } = await this.submitFile();
          createPostInput.url = data.url;
          createPostInput.fileId = data.id;
        }
        const createdPost = await this.$store.dispatch('post/createPost', createPostInput);
        if (createdPost) {
          this.$router.push(`/posts/view/${createdPost.id}`);
        }
      }
      const updatedPost = await this.$store.dispatch('post/updatePost', this.updatePostInput);
      if (updatedPost) {
        this.$router.push(`/posts/view/${updatedPost.id}`);
      }
    },
  },
  created() {
    if (this.mode === 'update') {
      // const activePost = this.$store.getters['post/getActivePost'];
      this.postInput.title = this.activePost.title;
      this.postInput.content = this.activePost.content;
      this.postInput.id = this.activePost.id;
    }
  },

};
</script>
