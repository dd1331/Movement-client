<template>
  <div class="home">
    <Home-Carousel :posts="recommendedPosts"></Home-Carousel>
    <Post-List :posts="popularPosts"></Post-List>
    <Home-News></Home-News>
  </div>
</template>

<script>
import HomeCarousel from '@/components/HomeCarousel.vue';
import HomeNews from '@/components/HomeNews.vue';
import PostList from '@/components/PostList3.vue';

export default {
  name: 'Home',
  components: {
    HomeNews,
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
