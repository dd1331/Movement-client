<template>
  <v-row>
    <v-col
      v-for="(item, index) in items"
      :key="index"
      class="ma-0 py-0"
      :cols="cols"
    >
      <div @click="click(item)">
        <v-img v-if="type==='recommended'"
          :src="item.files[0]? item.files[0].url : 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png'"
          aspect-ratio="1"  width="100"
          class="grey lighten-2"
        >
        </v-img>
        <v-img v-if="type==='news'"
          :src="item.image"
          aspect-ratio="1"  width="150"
          height="100"
          class="grey lighten-2"
        >
        </v-img>
      </div>
      <p class="grey--text text--darken-3">{{item.title}}</p>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ['items', 'cols', 'type'],
  methods: {
    openUrl(url) {
      window.open(url);
    },
    click(item) {
      if (this.type === 'recommended') this.$router.push(`/posts/view/${item.id}`);
      if (this.type === 'news') this.openUrl(item.url);
    },
  },
};
</script>
