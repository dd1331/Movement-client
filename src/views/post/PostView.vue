<template>
  <div v-if="post && post.poster" class="post-view">
    <section class="title border post-title">
      {{post.title}}

      {{formatDate(post.createdAt)}}
      조회 {{post.views}}
      작성자 {{post.poster.userName}}
      <span @click="edit">수정</span>
      <span @click="remove">삭제</span>
    </section>
    <section class="content">
      <div>
        <v-img :src="post.files[0].url"></v-img>
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
import dateMixins from '../../mixins/dateMixins';
import commentList from '../../components/CommentList';

export default {
  mixins: [dateMixins],
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
    currentCategory() {
      return this.$store.getters['common/getCurrentCategory'];
    },
  },
  methods: {
    edit() {
      this.$router.push(`/posts/edit/${this.post.id}`);
    },
    async remove() {
      const removedPost = await this.$store.dispatch('post/removePost', {
        id: this.post.id,
        category: this.currentCategory.title,
      });
      if (removedPost) {
        this.$router.push(`/posts/list/${this.currentCategory.title}`);
      }
    },
    setLikeStatus() {
      // TODO refactor using store
      const [userLike] = this.$store.getters['post/getActivePost'].likes.filter((like) => like.userId === this.user.id);
      this.likeStatus = userLike.isLike;
    },
    async likePost() {
      const payload = {
        postId: this.post.id,
        userId: this.user.id,
        type: 'post',
        isLike: true,
      };
      await this.$store.dispatch('post/likePost', payload);
      this.setLikeStatus();
    },
    async dislikePost() {
      const payload = {
        postId: this.post.id,
        userId: this.user.id,
        type: 'post',
        isLike: false,
      };
      await this.$store.dispatch('post/dislikePost', payload);
      this.setLikeStatus();
    },
  },
  data() {
    return {
      likeStatus: null,
    };
  },
  created() {
    const postId = this.$route.params.id;
    this.$store.dispatch('post/fetchPost', postId);
  },
  activated() {
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
