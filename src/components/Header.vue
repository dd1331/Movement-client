<template>
  <v-app-bar class="test" app color="white" dark flat>
      <div class="d-flex" @click="$router.push('/')">
        <!-- <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40"/> -->
        <h1 class="red--text text--lighten-1">
          movement
        </h1>
        <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100" src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="100"/>
      </div>
      <v-spacer></v-spacer>
        <span class="black--text" v-if="!user" @click="$router.push('/signup')">
          로그인
        </span>
        <span class="black--text" v-else @click="logout">
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
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    },
  },
  computed: {
    user() {
      return this.$store.getters['auth/getAppUser'];
    },

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
