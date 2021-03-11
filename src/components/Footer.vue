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
        :key="link"
        text
        class="my-2"
      >
        {{ link }}
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
      'Home',
      // 'About Us',
      'Team',
      // 'Services',
      'Blog',
      'Contact Us',
    ],
  }),
};
</script>
