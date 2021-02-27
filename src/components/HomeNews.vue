<template>
  <div class="my-5">
    뉴스
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
    <v-card>
      <v-sheet
        height="100%"
        color="white"
      >
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <Image-Grid class="ma-1" :items="newsSplited[i]" cols="6" type='news'></Image-Grid>
        </v-row>
      </v-sheet>
    </v-card>
    </v-carousel-item>
  </v-carousel>
  </div>
</template>
<script>
import axios from 'axios';
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
      const news = await axios.get('http://localhost:3000/news');
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
