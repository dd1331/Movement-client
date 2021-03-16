<template>
  <div class="home">
    <Home-Carousel :posts="recommendedPosts"></Home-Carousel>
    <div class="mt-4">
      <v-icon class="mb-1">
        mdi-fire
      </v-icon>
      <h3 class="grey--text text--darken-3 d-inline">
        인기
      </h3>
    </div>
    <Post-List :posts="popularPosts" category="true"></Post-List>
    <h3 class="grey--text text--darken-3 d-inline">
      트렌드
    </h3>
    <v-container class="d-flex mb-3 pt-0">
      <div>
        <v-chip
          v-for="(hashtag,index) in popularHashtags"
          v-bind:key="index"
          class="mx-1 my-1"
          color="red"
          outlined
          @click="search(hashtag)"
        >
          {{hashtag.title}}
        </v-chip>
      </div>
    </v-container>
    <v-icon class="mb-1">
      mdi-new-box
    </v-icon>
    <h4 class="grey--text text--darken-3 d-inline">
      최신
    </h4>
    <Post-List :posts="recentPosts" category="true"></Post-List>
    <Home-News></Home-News>
  </div>
</template>

<script>
import HomeCarousel from '@/components/HomeCarousel.vue';
import HomeNews from '@/components/HomeNews.vue';
import PostList from '@/components/PostList3.vue';

export default {
  methods: {
    search(hashtag) {
      this.$router.push({ path: 'posts/list/all', query: { hashtagId: hashtag.id, hashtagTitle: hashtag.title } });
    },
  },
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
    popularHashtags() {
      return this.$store.getters['hashtag/getPopularHashtags'];
    },

  },
  async created() {
    await this.$store.dispatch('post/fetchRecommendedPost');
    await this.$store.dispatch('post/fetchPopularPosts');
    await this.$store.dispatch('post/fetchRecentPosts');
    await this.$store.dispatch('hashtag/fetchPopularHashtags');
  },
};
</script>
