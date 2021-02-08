<template>
  <div>
    <h1>자유게시판</h1>
    <Post-list></Post-list>
  </div>
</template>
<script>
import PostList from '../components/PostList3';

export default {
  data() {
    return {};
  },
  components: { PostList },

};
</script>
