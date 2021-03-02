<template>
  <div>
    <section class="d-flex">
      <h1 v-if="currentCategory">{{currentCategory.koTitle}}</h1>
      <v-spacer></v-spacer>
      <v-btn v-if="!isNews" small="" @click="$router.push('/posts/form')">글쓰기</v-btn>

    </section>
    <news-list v-if="isNews"></news-list>
    <post-list-component v-else :posts="posts"></post-list-component>
  </div>
</template>
<script>
import PostListComponent from '../../components/PostList3';
import NewsList from '../../components/NewsList';

export default {
  data() {
    return { };
  },
  async created() {
    await this.$store.dispatch('post/fetchCategorizedPosts', this.currentCategory);
  },
  beforeRouteUpdate(_, __, next) {
    this.$store.dispatch('post/fetchCategorizedPosts', this.currentCategory);
    next();
  },
  computed: {
    isNews() {
      return this.$route.params.category === 'news';
    },
    currentCategory() {
      return this.$store.getters['common/getCurrentCategory'];
    },
    posts() {
      return this.$store.getters['post/getPosts'];
    },
  },

  components: { PostListComponent, NewsList },

};
</script>
