<template>
  <v-card>
    <v-tabs
      dark
      background-color="primary"
      show-arrows
    >
      <v-tabs-slider color="primary lighten-3"></v-tabs-slider>
      <v-tab
      class="p-0"
        v-for="category in categories"
        :key="category.id"
        @click="sendTo(category)"
      >
        {{ category.koTitle }}
      </v-tab>
    </v-tabs>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    categories() {
      return this.$store.getters['common/getCategories'].map((category) => {
        // eslint-disable-next-line no-param-reassign
        category.koTitle = this.translateToKorean(category.title);
        return category;
      });
    },
  },
  methods: {
    sendTo(category) {
      this.$store.commit('common/setCurrentCategory', category);

      if (this.$router.history.current.path === `/posts/list/${category.title}`) return;

      this.$router.push(`/posts/list/${category.title}`);
    },
    translateToKorean(key) {
      switch (key) {
        case 'exercise':
          return '운동';
        case 'environment':
          return '환경';
        case 'news':
          return '뉴스';
        case 'meetup':
          return '모임';
        default:
          return '잡담';
      }
    },
  },
};
</script>
