<template>
  <div>
    <h1>{{category.koTitle}}</h1>
    <post-list-component :posts="posts"></post-list-component>
  </div>
</template>
<script>
import PostListComponent from '../../components/PostList3';

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
    category() {
      return this.$store.getters['common/getCurrentCategory'];
    },
    posts() {
      return this.$store.getters['post/getPosts'];
    },
  },

  components: { PostListComponent },

};
</script>
