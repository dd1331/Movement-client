<template>
<div>
  <h2>게시판</h2>
  <v-container>
    <v-layout column="">
      <v-flex>
        <v-text-field
          placeholder="제목"
          v-model="postInput.title"
        ></v-text-field>
      </v-flex>
      <v-flex>
        <v-textarea
          solo
          name="input-7-4"
          placeholder="내용"
          v-model="postInput.content"
        ></v-textarea>
      </v-flex>
      <v-flex v-if="hashtags">
        <v-chip
          v-for="(hashtag,index) in hashtags"
          v-bind:key="index"
          class="ma-2"
          close
          @click:close="removeHashTag(index)"
        >
          {{hashtag}}
        </v-chip>
      </v-flex>
      <v-flex>
        <div>
        <v-text-field
          placeholder="해시태그"
          v-model="hashtag"
        ></v-text-field>
        <v-btn @click="addHashTag">추가</v-btn>
        </div>
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
      hashtag: '',
      file: '',
      hashtags: [],

    };
  },
  computed: {
    updatePostInput() {
      return {
        ...this.postInput,
        id: this.activePost.id,
        hashtags: this.hashtags,
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
    removeHashTag(index) {
      this.hashtags.splice(index, 1);
    },
    addHashTag() {
      this.hashtags.push(this.hashtag);
      this.hashtag = '';
    },
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
          category: this.currentCategory ? this.currentCategory.title : this.$route.params.category,
          hashtags: this.hashtags,
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
        return;
      }
      if (this.file) {
        const { data } = await this.submitFile();
        this.updatePostInput.url = data.url;
        this.updatePostInput.fileId = data.id;
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
