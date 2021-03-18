<template>
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
</template>
<script>
export default {
  props: ['type', 'parent'],
  data() {
    return {
      content: '',
    };
  },
  methods: {
    async createComment() {
      if (!this.user) return;

      if (this.type === 'child') {
        this.createChildComment();
        return;
      }
      const payload = {
        content: this.content,
        commenterId: this.user.id,
        postId: this.post.id,
      };
      await this.$store.dispatch('comment/createComment', payload);
      this.clearAll();
    },
    async createChildComment() {
      const payload = {
        comment: {
          content: this.content,
          commenterId: this.user.id,
          postId: this.post.id,
          parentId: this.parent.id,
        },
        type: this.type,
      };
      await this.$store.dispatch('comment/createChildComment', payload);
      // TODO check why it dosen't work with nested computed values
      // this.$set(this.parent, 'child', childComments);
      // this.toggleComment(this.parent);
      this.clearAll();
    },
    clearAll() {
      this.content = '';
      this.$emit('onCreated');
    },
    toggleComment(parent) {
      const targetComment = this.post.comments.find((comment) => comment.id === parent.id);
      if (!parent.isOpen) {
        this.$set(targetComment, 'isOpen', true);
      }
    },
  },
  computed: {
    user() {
      return this.$store.getters['auth/getAppUser'];
    },
    post() {
      return this.$store.getters['post/getActivePost'];
    },
  },
};
</script>
