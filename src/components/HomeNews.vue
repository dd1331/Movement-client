<template>
  <div class="my-3">
    <v-icon class="mb-1">
      mdi-newspaper-variant
    </v-icon>
    <h3 class="grey--text text--darken-3 d-inline">
      뉴스
    </h3>
    <v-carousel
      cycle
      height="150"
      hide-delimiter-background
      show-arrows-on-hover
      interval="1000000"
      delimiter-icon="mdi-minus"
    >
    <v-carousel-item
        v-for="(slide, i) in newsSplited"
        :key="i"
      >
        <Image-Grid :items="newsSplited[i]" cols="6" type='news'></Image-Grid>
    </v-carousel-item>
  </v-carousel>
  </div>
</template>
<script>
import ImageGrid from '@/components/ImageGrid';

export default {
  components: { ImageGrid },
  data() {
    return {
      news: [],
    };
  },
  methods: {
    async getNews() {
      const news = await this.$axios.get('http://localhost:3000/news');
      this.news = news.data;
    },
  },
  computed: {
    newsSplited() {
      const news = this.news.slice(0, 6);
      const newsArray = [];
      while (news.length > 0) {
        newsArray.push(news.splice(0, 2));
      }
      return newsArray;
    },
  },
  created() {
    this.getNews();
  },
};
</script>
