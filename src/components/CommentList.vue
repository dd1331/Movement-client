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
    <div v-for="comment in post.comments" v-bind:key="comment.id">
      <ul class="pa-0">
          <div class="d-flex">
            <v-avatar
              class="mt-1"
              color="primary"
              size="45"
            >
            <img v-if="comment.commenter.avatar"
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            >
            <span v-else class="white--text headline">
              {{comment.commenter.userName.slice(0,1).toUpperCase()}}
            </span>
            </v-avatar>
            <v-container fluid class="pt-0 pl-5 pr-0">
              <div class="d-flex justify-space-between">
                {{comment.commenter.userName}}
                ・
                {{formatDate(comment.createdAt,{format:'M.D HH:MM'})}}
              <div>
                <v-icon @click="deleteComment(comment.id)">
                  mdi-pencil
                </v-icon>
                <v-icon @click="deleteComment(comment.id)">
                  mdi-delete
                </v-icon>
              </div>
              </div>
              <span>
                {{comment.content}}
              </span>
              <div class="ml-n1">
                <v-btn icon>
                  <v-icon @click="deleteComment(comment.id)">
                    mdi-thumb-up
                  </v-icon>
                </v-btn>
                {{comment.like}}
                <v-btn icon>
                  <v-icon @click="deleteComment(comment.id)">
                    mdi-thumb-down
                  </v-icon>
                </v-btn>
                {{comment.dislike}}
                <v-btn icon>
                  <v-icon @click="deleteComment(comment.id)">
                    mdi-comment
                  </v-icon>
                </v-btn>
              </div>
            </v-container>
          </div>
      </ul>
    </div>
  </div>
</template>
<script>
import dateMixins from '../mixins/dateMixins';

export default {
  mixins: [dateMixins],
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
