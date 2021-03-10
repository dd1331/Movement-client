<template>
  <div>
    <comment-input></comment-input>
    <div v-for="comment in comments" v-bind:key="comment.id">
      <ul class="pa-0">
        <comment :comment="comment" @toggleComment="toggleComment" ></comment>
          <v-container v-if="comment.isOpen" class="pl-15 pr-0 py-0">
            <!-- TODO refactor poor workaround for nested computed value -->
            <span class="d-none">{{comment.childCount}}</span>
            <comment v-for="child in comment.child" :comment="child" type="childComment"
              v-bind:key="child.id" size="30">
            </comment>
          </v-container>
      </ul>
    </div>
  </div>
</template>
<script>

import Comment from './Comment';
import CommentInput from './CommentInput';

export default {
  components: { Comment, CommentInput },
  computed: {
    comments() {
      return this.$store.getters['comment/getActiveComments'];
    },
    post() {
      return this.$store.getters['post/getActivePost'];
    },
  },
  methods: {
    toggleComment(parent) {
      if (!parent.isOpen) {
        this.fetchChildComment(parent);
        return;
      }
      this.$store.commit('comment/setIsOpen', parent.id);
    },
    async fetchChildComment(parent) {
      const targetComment = this.comments.find((comment) => comment.id === parent.id);
      await this.$store.dispatch('comment/fetchChildComment', targetComment.id);
      this.$store.commit('comment/setIsOpen', parent.id);
    },
  },
};
</script>
