<template>
  <v-list>
    <template v-for="(item, index) in news">
      <v-divider
        v-if="index !== 0"
        :key="index"
      ></v-divider>

      <v-list-item
        class="px-0"
        :key="index + 's'"
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
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>
<script>

import dateMixins from '../mixins/dateMixins';
import VUE_APP_SERVER_HOST from '../../env-config';

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
      const news = await this.$axios.get(`${VUE_APP_SERVER_HOST}/news`);
      this.news = news.data;
    },
  },
};
</script>
