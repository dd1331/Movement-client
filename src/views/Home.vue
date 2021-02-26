<template>
  <div class="home">
    추천글
    <Home-Carousel :posts="recommendedPosts"></Home-Carousel>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    인기글
    <Post-List :posts="popularPosts"></Post-List>
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
    popularPosts() {
      return this.$store.getters['post/getPopularPosts'];
    },
    recommendedPosts() {
      return this.$store.getters['post/getRecommendedPost'];
    },
  },
  async created() {
    await this.$store.dispatch('post/fetchPopularPosts');
    await this.$store.dispatch('post/fetchRecommendedPost');
  },
};
</script>
