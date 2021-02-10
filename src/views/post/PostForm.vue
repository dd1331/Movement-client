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
      <!-- <v-flex>
        <v-btn>파일첨부</v-btn>
      </v-flex> -->
      <v-flex align-self-center>
        <v-btn @click="createOrUpdate">확인</v-btn>
        <v-btn>취소</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>
<script>
export default {
  data() {
    return {
      postInput: {
        title: '',
        content: '',
      },
      createPostInput: {
        ...this.postInput,
        poster: 0,
      },
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
  },
  methods: {
    createOrUpdate() {
      if (this.mode === 'create') {
        this.createPostInput.poster = this.user.id;
        this.$store.dispatch('post/creataPost', this.createPostInput);
        return;
      }
      this.$store.dispatch('post/updatePost', this.updatePostInput);
    },
  },
  created() {
    console.log(this.mode);
    if (this.mode === 'update') {
      // const activePost = this.$store.getters['post/getActivePost'];
      this.postInput.title = this.activePost.title;
      this.postInput.content = this.activePost.content;
      this.postInput.id = this.activePost.id;
    }
  },

};
</script>
