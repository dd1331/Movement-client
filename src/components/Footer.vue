<template>
  <v-footer
    color="white"
    padless
  >
  <v-divider></v-divider>
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
      <v-divider class="mb-4"></v-divider>
        {{ new Date().getFullYear() }} — <strong>movement</strong>
      </v-col>
    </v-row>
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
};
</script>
