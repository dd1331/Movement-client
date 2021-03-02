<template>
  <div class="home">
    <Home-Carousel :posts="recommendedPosts"></Home-Carousel>
    <div class="mt-4">
      <v-icon class="mb-1">
        mdi-fire
      </v-icon>
      <h4 class="grey--text text--darken-3 d-inline">
        인기
      </h4>
    </div>
    <Post-List :posts="popularPosts" category="true"></Post-List>
    <Home-News></Home-News>
    <v-icon class="mb-1">
      mdi-new-box
    </v-icon>
    <h4 class="grey--text text--darken-3 d-inline">
      최신
    </h4>
    <Post-List :posts="recentPosts" category="true"></Post-List>
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
    recommendedPosts() {
      return this.$store.getters['post/getRecommendedPost'];
    },
    popularPosts() {
      return this.$store.getters['post/getPopularPosts'];
    },
    recentPosts() {
      return this.$store.getters['post/getRecentPosts'];
    },

  },
  async created() {
    await this.$store.dispatch('post/fetchRecommendedPost');
    await this.$store.dispatch('post/fetchPopularPosts');
    await this.$store.dispatch('post/fetchRecentPosts');
  },
};
</script>
