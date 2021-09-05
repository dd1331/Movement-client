<template>
  <v-footer
    color="white"
    padless
    style="display:block"
  >
    <v-divider></v-divider>
    <div :style="wrapper">

      <v-row
        justify="center"
        no-gutters
      >
        <v-btn
          v-for="link in links"
          :key="link.title"
          text
          class="my-2"
          @click="onClick(link)"
        >
          {{ link.title }}
        </v-btn>
        <v-col
          class="mb-4 text-center"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>movement</strong>
        </v-col>
      </v-row>
    </div>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      {
        title: 'Home',
        link: '/',
      },
      {
        title: 'Github',
        link: 'https://github.com/dd1331',
      },
      {
        title: 'About me',
        link: '/',
      },
    ],
  }),
  methods: {
    onClick(link) {
      if (link.title === 'Github') window.open(link.link);
      else this.$router.push(link.link);
    },
  },
  computed: {
    wrapper() {
      return `margin-left: auto; margin-right: auto; ${this.isMobile ? '' : 'max-width: 70rem;'}`;
    },
  },
};
</script>
