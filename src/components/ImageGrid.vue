<template>
  <v-row class="mt-3">
    <v-col
      v-for="(item, index) in items"
      :key="index"
      class="ma-0 pa-0 justify-space-between"
      :cols="cols"
    >
      <v-container @click="click(item)" class="py-0">
        <v-card color="#ffffff" class="mb-1">
          <v-img v-if="type==='recommended'"
            class="m-pointer"
            aspect-ratio="1"  width="100" :contain="true"
            :style="`background-image:url(${item.files[0]? item.files[0].url : '/Movement.png'});
              background-size:cover; background-repeat:no-repeat;
              background-position: center center;`"
          >
          </v-img>
          <v-img v-if="type==='news'"
            :src="item.image"
            aspect-ratio="1"  width="170"
            height="100"
            class="grey lighten-2 m-pointer"
          >
          </v-img>
        </v-card>
        <p class="grey--text text--darken-3 text-truncate ma-0">{{item.title}}</p>
      </v-container>
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
<style lang="scss" scoped>
.border {
  border: solid #FFCDD2 1px;
  border-radius: 10%;
}
.m-pointer {
  cursor:pointer;
}
</style>
