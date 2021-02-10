<template>
  <div v-if="post && post.poster" class="post-view">
    <section class="title border post-title">
      {{post.title}}

      {{post.createdAt}}
      {{post.views}}
      {{post.poster.userName}}
      <span @click="edit">수정</span>
      <span @click="remove">삭제</span>
    </section>
    <section class="content">
      <div>
        {{post.content}}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, cupiditate?
      </div>
      <div class="content-bottom">
        <v-btn>좋아요</v-btn>
        <v-btn>싫어요</v-btn>
      </div>
    </section>
    <section>
      <comment-list></comment-list>
    </section>
  </div>
</template>
<script>
import commentList from '../../components/CommentList';

export default {
  components: { commentList },
  computed: {
    // post() {
    //   return this.$store.getters['post/getActivePost'];
    // },
  },
  methods: {
    edit() {
      // this.$store.dispatch('post/edit', );
      this.$router.push(`/posts/edit/${this.post.id}`);
    },
    remove() {
      this.$store.dispatch('post/remove', this.post.id);
    },
  },
  data() {
    return {
      post: {},
    };
  },
  async created() {
    const postId = this.$route.params.id;
    await this.$store.dispatch('post/fetchPost', postId);
    // this.post = await this.$store.dispatch('post/fetchPost', postId);
    this.post = this.$store.getters['post/getActivePost'];
  },
};
</script>
<style lang="scss" scoped>
.border {
  border: solid
}
.post-title {
  height: 5rem
}
.content-bottom {
  display: flex;
  justify-content: center;
}
</style>
