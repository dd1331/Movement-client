<template>
  <div>
    <v-alert :class="this.$vuetify.breakpoint.name === 'xs' ? 'd-none' :'' "
        class="ma-0" text prominent type="warning">
        개발자 도구를 이용하여 모바일 화면을 이용해주세요 ㅠㅠ
    </v-alert>
    <v-app-bar class="test" app color="white" style="position: relative" dark flat>
      <div class="d-flex" @click="goHome">
        <h1 class="red--text text--lighten-1">
          movement
        </h1>
      </div>
      <v-spacer></v-spacer>
        <span class="black--text" v-if="!user" @click="$router.push('/login')">
          로그인
        </span>
        <span class="black--text" v-else @click="logout">
          로그아웃
        </span>
      <template v-slot:extension>
        <Menu-Slider v-if="!$router.path"></Menu-Slider>
      </template>
    </v-app-bar>
  </div>
</template>
<script>
import MenuSlider from './MenuSlider';

export default {
  components: {
    MenuSlider,
  },
  methods: {
    goHome() {
      if (this.$router.history.current.path === '/') return;
      this.$router.push('/');
    },
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
