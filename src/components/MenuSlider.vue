<template>
  <v-card>
    <v-tabs
      dark
      background-color="primary"
      show-arrows
    >
    <!-- TODO check what v-tabs-slider is for -->
      <!-- <v-tabs-slider color="primary lighten-3"></v-tabs-slider> -->
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
/* eslint-disable no-undef */
import translateMixins from '../mixins/translateMixins';

export default {
  mixins: [translateMixins],
  data() {
    return {
    };
  },
  computed: {
    categories() {
      return this.$store.getters['common/getCategories'].map((category) => {
        // eslint-disable-next-line no-param-reassign
        category.koTitle = this.titleToKorean(category.title);
        return category;
      });
    },
    currentCategory() {
      return this.$store.getters['common/getCurrentCategory'];
    },
  },
  methods: {
    sendTo(category) {
      this.$store.commit('common/setCurrentCategory', category);

      if (this.$router.history.current.path === `/posts/list/${category.title}`) return;

      this.$router.push(`/posts/list/${category.title}`);
    },
  },
};
</script>
