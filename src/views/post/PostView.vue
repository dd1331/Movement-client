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
      </div>
      <div class="content-bottom">
        <v-btn :color="likeStatus && likeStatus !== null ? 'pink accent-1' : ''" @click="likePost">
          좋아요{{likes.length}}
        </v-btn>
        <v-btn :color="!likeStatus && likeStatus !== null ? 'pink accent-1' : ''"
          @click="dislikePost">
          싫어요{{dislikes.length}}
        </v-btn>
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
    post() {
      return this.$store.getters['post/getActivePost'];
    },
    user() {
      return this.$store.getters['auth/getAppUser'];
    },
    likes() {
      return this.post.likes.filter((like) => {
        if (like.isLike === true) return like;
        return null;
      });
    },
    dislikes() {
      return this.post.likes.filter((like) => {
        if (like.isLike === false) return like;
        return null;
      });
    },
  },
  methods: {
    edit() {
      this.$router.push(`/posts/edit/${this.post.id}`);
    },
    async remove() {
      const removedPost = await this.$store.dispatch('post/removePost', this.post.id);
      if (removedPost) {
        this.$router.push('/posts');
      }
    },
    setLikeStatus() {
      // TODO refactor using store
      const [userLike] = this.post.likes.filter((like) => like.userId === this.user.id);
      this.likeStatus = userLike.isLike;
    },
    async likePost() {
      const payload = {
        postId: this.post.id,
        userId: this.user.id,
        type: 'post',
        isLike: true,
      };
      const res = await this.$store.dispatch('post/likePost', payload);
      this.setLikeStatus();
      console.log('res', res);
    },
    async dislikePost() {
      const payload = {
        postId: this.post.id,
        userId: this.user.id,
        type: 'post',
        isLike: false,
      };
      const res = await this.$store.dispatch('post/dislikePost', payload);
      this.setLikeStatus();
      console.log('res2', res);
    },
  },
  data() {
    return {
      likeStatus: null,
    };
  },
  async created() {
    const postId = this.$route.params.id;
    await this.$store.dispatch('post/fetchPost', postId);
    this.setLikeStatus();
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
