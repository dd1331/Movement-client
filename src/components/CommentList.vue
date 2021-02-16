<template>
  <div>
    <v-container>
     <v-row>
      <v-col
        cols="8"
      >
        <v-text-field
            v-model="content"
            solo
            label="댓글"
            clearable
        >
        </v-text-field>
      </v-col>
      <v-col cols="4">
        <v-btn @click="createComment">댓글 쓰기</v-btn>
      </v-col>
     </v-row>
    </v-container>
    <div v-for="comment in post.comments" v-bind:key="comment.id">
      <ul>
        {{comment.content}}
        {{comment.createdAt}}
        {{comment.like}}
        {{comment.dislike}}
        {{comment.commenter.userName}}
        <v-icon @click="deleteComment(comment.id)">
          mdi-close-thick
        </v-icon>
      </ul>
      <v-divider></v-divider>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: '',
    };
  },
  computed: {
    post() {
      return this.$store.getters['post/getActivePost'];
    },
    user() {
      return this.$store.getters['auth/getAppUser'];
    },
  },
  methods: {
    async createComment() {
      const payload = {
        content: this.content,
        commenterId: this.user.id,
        postId: this.post.id,
      };
      this.$store.dispatch('comment/createComment', payload);
    },
    deleteComment(commentId) {
      const payload = {
        commentId,
      };
      this.$store.dispatch('comment/deleteComment', payload);
    },
  },
};
</script>
