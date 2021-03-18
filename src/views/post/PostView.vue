<template>
  <div v-if="post && post.poster" class="post-view">
    <section>
      <h2>
        {{post.title}}
      </h2>
      <p class="ma-0 font-weight-medium">
        {{post.poster.userName}}
      </p>
      <div class="d-flex justify-space-between">
        {{post.views}} views
        ・
        {{formatDate(post.createdAt, {format:'M.D HH:MM'})}}
        <div>
          <option-menu @onEdit="edit" v-if="user && user.id === post.poster.id"
          @onDelete="remove"></option-menu>
        </div>
      </div>
      <!-- <div class="d-flex">
        <span class="font-weight-black">#</span>
        <v-chip
          class="mx-1"
          small
          color="red"
          outlined
        >
          ㅅㄷㄴ
        </v-chip>
        <v-chip
          class="mx-1"
          small
          color="red"
          outlined
        >
          ㅅㄷㄴ
        </v-chip>
      </div> -->
    </section>
    <v-divider class="my-3"></v-divider>
    <!-- <section class="content"> -->
    <section>
      <div>
        <v-img v-if="post.files[0]" :src="post.files[0].url"></v-img>
        {{post.content}}
      </div>
      <div class="justify-center d-flex ml-n4">
        <v-btn icon :color="likeStatus && likeStatus !== null ? 'blue lighten-1' : ''">
          <v-icon
            @click="likePost">
            mdi-thumb-up
          </v-icon>
        </v-btn>
        <span class="mt-1">
          {{likes.length}}
        </span>
        <v-btn icon>
          <v-icon :color="!likeStatus && likeStatus !== null ? 'pink accent-1' : ''"
            @click="dislikePost">
            mdi-thumb-down
          </v-icon>
        </v-btn>
        <span class="mt-1">
          {{dislikes.length}}
        </span>
      </div>
    </section>
    <v-divider class="my-6"></v-divider>
    <section>
      <comment-list></comment-list>
    </section>
  </div>
</template>
<script>
import dateMixins from '../../mixins/dateMixins';
import CommentList from '../../components/CommentList';
import OptionMenu from '../../components/OptionMenu';

export default {
  mixins: [dateMixins],
  components: { CommentList, OptionMenu },
  computed: {
    post() {
      return this.$store.getters['post/getActivePost'];
    },
    user() {
      return this.$store.getters['auth/getAppUser'];
    },
    likes() {
      return this.post.likes.filter((like) => like.isLike === true);
    },
    dislikes() {
      return this.post.likes.filter((like) => like.isLike === false);
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
      if (!this.user) {
        this.sendTo('/login');
        return;
      }

      const payload = {
        targetId: this.post.id,
        userId: this.user.id,
        type: 'post',
        isLike: true,
      };
      await this.$store.dispatch('post/likePost', payload);
      this.setLikeStatus();
    },
    async dislikePost() {
      if (!this.user) {
        this.sendTo('/login');
        return;
      }

      const payload = {
        targetId: this.post.id,
        userId: this.user.id,
        type: 'post',
        isLike: false,
      };
      await this.$store.dispatch('post/dislikePost', payload);
      this.setLikeStatus();
    },
    sendTo(path) {
      this.$router.push(path);
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
  mounted() {
  },
};
</script>
<style lang="scss" scoped>
</style>
