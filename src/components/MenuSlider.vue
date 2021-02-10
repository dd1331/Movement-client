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
        v-for="i in items"
        :key="i"
        :href="'#tab-' + i"
        @click="$router.push('/posts')"
      >
        {{ i }}
      </v-tab>
    </v-tabs>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      items: ['일상1', '일상2', '일상3', '일상4', '일상5', '일상6'],
    };
  },
};
</script>
