<template>
  <div>
    <h1>{{category.koTitle}}</h1>
    <v-spacer></v-spacer>
    <v-btn v-if="!isNews" @click="$router.push('/posts/form')">글쓰기</v-btn>
    <news-list v-if="isNews"></news-list>
    <post-list-component v-else :posts="posts"></post-list-component>
  </div>
</template>
<script>
import PostListComponent from '../../components/PostList3';
import NewsList from '../../components/NewsList';

export default {
  data() {
    return {};
  },
  created() {
  },
  beforeRouteUpdate(_, __, next) {
    const category = this.$store.getters['common/getCurrentCategory'];
    this.$store.dispatch('post/fetchCategorizedPosts', category);
    next();
  },
  computed: {
    isNews() {
      return this.$route.params.category === 'news';
    },
    category() {
      return this.$store.getters['common/getCurrentCategory'];
    },
    posts() {
      return this.$store.getters['post/getPosts'];
    },
  },

  components: { PostListComponent, NewsList },

};
</script>
