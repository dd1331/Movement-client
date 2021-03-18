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
        <option-menu v-if="user && comment.commenter.id === user.id"
          @onEdit="deleteComment(comment.id)"
          @onDelete="deleteComment(comment.id)"></option-menu>
      </div>
      </div>
      <span>
        {{comment.content}}
      </span>
      <div class="ml-n1">
        <v-btn icon>
          <v-icon @click="likeComment(comment.id)"
            :color="likeStatus && likeStatus !== null ? 'blue lighten-1' : ''">
            mdi-thumb-up
          </v-icon>{{comment.likes.filter((like) => like.isLike === true).length}}
        </v-btn>
        <v-btn icon>
          <v-icon @click="dislikeComment(comment.id)"
            :color="!likeStatus && likeStatus !== null ? 'pink accent-1' : ''"
          >
            mdi-thumb-down
          </v-icon>{{comment.likes.filter((like) => like.isLike === false).length}}
        </v-btn>
        <v-btn v-if="type !== 'childComment'" icon @click="toggleInput">
          <v-icon>
            mdi-comment
          </v-icon>
        </v-btn>
      </div>
      <comment-input v-if="isInputOpen" type="child" :parent="comment">
      </comment-input>
      <span v-if="comment.childCount" @click="$emit('toggleComment', comment)"
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
      likeStatus: null,
    };
  },
  watch: {
  // TODO check out why it's called only when parent value is called on CommentList
    comment() {
      // console.log('co');
    },
  },
  computed: {
    post() {
      return this.$store.getters['post/getActivePost'];
    },
    user() {
      return this.$store.getters['auth/getAppUser'];
    },
    // TODO check if nested computed works. its not atm
    likes() {
      return this.comment.likes.filter((like) => like.isLike === true);
    },
    dislikes() {
      return this.comment.likes.filter((like) => like.isLike === false);
    },
  },
  methods: {
    toggleInput() {
      if (!this.user) {
        this.sendTo('/login');
        return;
      }
      this.isInputOpen = !this.isInputOpen;
    },
    sendTo(path) {
      this.$router.push(path);
    },
    setLikeStatus(likes) {
      const like = likes.find((l) => l.userId === this.user.id);
      this.likeStatus = like.isLike;
      // TODO refactor using store
    },
    async likeComment() {
      if (!this.user) {
        this.sendTo('/login');
        return;
      }
      const payload = {
        data: {
          type: this.type === 'childComment' ? 'childComment' : 'comment',
          isLike: true,
          targetId: this.comment.id,
          userId: this.user.id,
        },
        parentId: this.comment.parentId,
      };
      const likes = await this.$store.dispatch('comment/likeComment', payload);
      this.setLikeStatus(likes);
    },
    async dislikeComment() {
      if (!this.user) {
        this.sendTo('/login');
        return;
      }
      const payload = {
        data: {
          type: this.type === 'childComment' ? 'childComment' : 'comment',
          isLike: false,
          targetId: this.comment.id,
          userId: this.user.id,
        },
        parentId: this.comment.parentId,
      };
      const likes = await this.$store.dispatch('comment/dislikeComment', payload);
      this.setLikeStatus(likes);
    },
    deleteComment(commentId) {
      const payload = {
        commentId,
        postId: this.post.id,
      };
      if (this.type === 'childComment') {
        this.$store.dispatch('comment/deleteChildComment', payload);
        return;
      }
      this.$store.dispatch('comment/deleteComment', payload);
    },
  },
};
</script>
