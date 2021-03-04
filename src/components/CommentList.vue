<template>
  <div>
    <v-container class="mb-3">
     <v-row>
      <v-col
        cols="9"
        class="pa-0"
      >
        <v-text-field
          v-model="content"
          dense
          placeholder="댓글"
          clearable
        >
        </v-text-field>
      </v-col>
      <v-col cols="3" class="pa-0 text-right">
        <v-btn @click="createComment">확인</v-btn>
      </v-col>
     </v-row>
    </v-container>
    <div v-for="comment in comments" v-bind:key="comment.id">
      <ul class="pa-0">
        <comment :comment="comment" @toggleComment="toggleComment" ></comment>
          <v-container v-if="comment.isOpen" class="pl-15 pr-0 py-0">
          <comment v-for="child in comment.child" :comment="child"
           v-bind:key="child.id" size="30"></comment>
          </v-container>
      </ul>
    </div>
  </div>
</template>
<script>

import Comment from './Comment';

export default {
  components: { Comment },
  data() {
    return {
      content: '',
    };
  },
  computed: {
    comments() {
      return this.post.comments;
    },
    post() {
      return this.$store.getters['post/getActivePost'];
    },
    user() {
      return this.$store.getters['auth/getAppUser'];
    },
  },
  methods: {
    toggleComment(parent) {
      if (!parent.isOpen) {
        this.fetchChildComment(parent);
        return;
      }
      const targetComment = this.post.comments.find((comment) => comment.id === parent.id);
      this.$set(targetComment, 'isOpen', false);
    },
    async fetchChildComment(parent) {
      const targetComment = this.post.comments.find((comment) => comment.id === parent.id);
      const childComments = await this.$store.dispatch('comment/fetchChildComment', targetComment.id);
      this.$set(targetComment, 'child', childComments);
      this.$set(targetComment, 'isOpen', true);
    },
    async createComment() {
      const payload = {
        content: this.content,
        commenterId: this.user.id,
        postId: this.post.id,
      };
      await this.$store.dispatch('comment/createComment', payload);
      this.content = '';
    },
    deleteComment(commentId) {
      const payload = {
        commentId,
        postId: this.post.id,
      };
      this.$store.dispatch('comment/deleteComment', payload);
    },
  },
};
</script>
