<template>
  <v-carousel
    cycle
    height="270"
    hide-delimiter-background
    show-arrows-on-hover
    interval="1000000"
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
        :color="colors[i]"
        height="100%"
      >
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <Image-Grid class="ma-1"></Image-Grid>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>
<script>
import ImageGrid from '@/components/ImageGrid';

export default {
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
