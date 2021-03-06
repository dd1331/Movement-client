<template>
  <div class="d-flex">
    <v-avatar
      class="mt-1"
      color="primary"
      :size="size? size: 45"
    >
      <img v-if="comment.commenter.avatar"
        :src="comment.commenter.avatar"
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
        <option-menu @onEdit="deleteComment(comment.id)"
          @onDelete="deleteComment(comment.id)"></option-menu>
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
        <v-btn v-if="type !== 'child'" icon @click="isInputOpen = !isInputOpen">
          <v-icon>
            mdi-comment
          </v-icon>
        </v-btn>
      </div>
      <comment-input v-if="isInputOpen" type="child" :parent="comment"
        @onCreated="onCreated">
      </comment-input>
      <span v-if="comment.childCount " @click="$emit('toggleComment', comment)"
        class="font-weight-bold">{{comment.childCount}}개 {{comment.isOpen ? '숨기기' : '더보기'}}
      </span>
    </v-container>
  </div>
</template>
<script>
import dateMixins from '../mixins/dateMixins';
import CommentInput from './CommentInput';
import OptionMenu from './OptionMenu';

export default {
  mixins: [dateMixins],
  props: ['comment', 'size', 'type'],
  components: { CommentInput, OptionMenu },
  data() {
    return {
      isInputOpen: false,
    };
  },
  computed: {
    post() {
      return this.$store.getters['post/getActivePost'];
    },
  },
  methods: {
    onCreated() {
      // this.isInputOpen = !this.isInputOpen;
    },
    deleteComment(commentId) {
      const payload = {
        commentId,
        postId: this.post.id,
      };
      if (this.type === 'child') {
        this.$store.dispatch('comment/deleteChildComment', payload);
        return;
      }
      this.$store.dispatch('comment/deleteComment', payload);
    },
  },
};
</script>