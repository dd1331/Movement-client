<template>
  <v-app-bar class="test" app color="primary" dark>
      <div class="d-flex align-center" @click="$router.push('/')">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40"/>
        <span>
          movement
        </span>
        <!-- <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100" src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="100"/> -->
      </div>
      <v-spacer></v-spacer>
        <span @click="$router.push('/login')">
          Login
        </span>

      <!-- <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
      <template v-slot:extension>
        <Menu-Slider v-if="!$router.path"></Menu-Slider>
      </template>
    </v-app-bar>
</template>
<script>
import MenuSlider from './MenuSlider';

export default {
  components: {
    MenuSlider,
  },
};
</script>

<style lang="scss">
.test {
  .v-toolbar__extension {
    padding: 0;
  }
}
</style>
