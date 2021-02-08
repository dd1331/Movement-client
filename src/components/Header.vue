<template>
  <v-app-bar class="test" app color="primary" dark>
      <div class="d-flex align-center" @click="$router.push('/')">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40"/>
        <h1>
          movement
        </h1>
        <!-- <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100" src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="100"/> -->
      </div>
      <v-spacer></v-spacer>
        <span v-if="true" @click="$router.push('/login')">
          로그인
        </span>
        <span v-else @click="$router.push('/login')">
          로그아웃
        </span>

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
