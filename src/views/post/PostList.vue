<template>
  <div>
    <h1>자유게시판</h1>
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
    this.$store.dispatch('post/fetchAllPosts');
  },
  computed: {
    posts() {
      return this.$store.getters['post/getPosts'];
    },
  },
  components: { PostListComponent },

};
</script>
