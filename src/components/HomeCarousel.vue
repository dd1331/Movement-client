<template>
  <div>
    <v-carousel
      cycle
      height="300"
      hide-delimiter-background
      show-arrows-on-hover
      interval="1000000"
    >
      <!-- <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
      > -->
        <div class="">
          <v-icon class="grey--text text--darken-1 mb-1">
            mdi-trophy
          </v-icon>
          <h3 class="grey--text text--darken-3 d-inline">
            추천
          </h3>
        </div>
          <!-- <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          > -->
          <div class="mt-3">

            <Image-Grid :items="posts" cols="4" type="recommended"></Image-Grid>
          </div>
          <!-- </v-row> -->
      <!-- </v-carousel-item> -->
    </v-carousel>
  </div>
</template>
<script>
import ImageGrid from '@/components/ImageGrid';

export default {
  props: ['posts'],
  data() {
    return {
      colors: [
        'white',
        'red lighten-1',
        'indigo',
        'warning',
        'pink darken-2',
        'deep-purple accent-4',
      ],
      slides: [
        'First',
        'Second',
      ],
    };
  },
  components: {
    ImageGrid,
  },
};
</script>
