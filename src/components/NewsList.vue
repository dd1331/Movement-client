<template>
  <v-list three-line>
    <template v-for="(item, index) in news">
      <v-divider
        v-if="index % 2 !== 0"
        :key="index"
        :inset="item.inset"
      ></v-divider>

      <v-list-item
        v-else
        :key="item.title"
        @click="openUrl(item.url)"
      >
        <v-list-item-avatar rounded="0" width="125" height="82">
          <v-img :src="item.image"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-html="item.title"></v-list-item-title>
          <v-list-item-subtitle class="d-none d-sm-block">{{item.summary}}</v-list-item-subtitle>
          <v-list-item-subtitle>{{item.writer}}</v-list-item-subtitle>
          <v-list-item-subtitle>{{formatDate(item.writtenAt)}}</v-list-item-subtitle>
          <!-- <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle> -->
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>
<script>
import axios from 'axios';
import dateMixins from '../mixins/dateMixins';

export default {
  mixins: [dateMixins],
  data: () => ({
    news: [],
  }),
  created() {
    this.getNews();
  },
  methods: {
    openUrl(url) {
      window.open(url);
    },
    async getNews() {
      const news = await axios.get('http://localhost:3000/news');
      this.news = news.data;
    },
  },
};
</script>
