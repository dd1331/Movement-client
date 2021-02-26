<template>
  <v-row>
    <v-col
      v-for="(post, index) in posts"
      :key="index"
      class="ma-0 py-0"
      cols="4"
    >
      <v-card @click="$router.push(`/posts/view/${post.id}`)">
        <v-img
          :src="post.files[0]? post.files[0].url : 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png'"
          aspect-ratio="1"  width="100"
          class="grey lighten-2"
        >
          <!-- <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >dasdd
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              >123</v-progress-circular>
            </v-row>
          </template> -->
        </v-img>

      </v-card>
      <p class="grey--text text--darken-3">{{post.title}}</p>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ['posts'],
};
</script>
