<template>
  <div class="home">
    <Home-Carousel></Home-Carousel>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Post-List :posts="posts"></Post-List>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import HomeCarousel from '@/components/HomeCarousel.vue';
import PostList from '@/components/PostList3.vue';

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    HomeCarousel,
    PostList,
  },
  data() {
    return {
    };
  },
  computed: {
    posts() {
      return this.$store.getters['post/getPosts'];
    },
  },
  created() {
    this.$store.dispatch('post/fetchPosts');
  },
};
</script>
