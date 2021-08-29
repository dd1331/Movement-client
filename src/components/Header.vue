<template>
  <div>
    <!-- <v-alert :class="this.$vuetify.breakpoint.name === 'xs' ? 'd-none' :'' "
        class="ma-0" text prominent type="warning">
        개발자 도구를 이용하여 모바일 화면을 이용해주세요 ㅠㅠ
    </v-alert> -->
    <v-app-bar class="no-padding"
      style="position: relative;" flat>
      <div class="d-flex" @click="goHome">
        <h1 class="m-pointer red--text text--lighten-1">
          movement
        </h1>
      </div>
      <v-spacer></v-spacer>
        <v-icon class="grey--text text--darken-1 mr-2" @click="routeTo('/posts/search')">
          mdi-magnify
        </v-icon>
        <span class="black--text m-pointer" v-if="!user" @click="$router.push('/login')">
          로그인
        </span>
        <div v-else>
          <v-icon class="grey--text text--darken-1 mr-2" @click="routeTo('/user/profile')">
            mdi-account-outline
          </v-icon>
          <span class="black--text m-pointer"  @click="logout">
            로그아웃
          </span>
        </div>
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
    routeTo(path) {
      if (this.$router.history.current.path === path) return;

      this.$router.push(path);
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
.no-padding {
  .v-toolbar__extension {
    padding: 0;
  }
}
.m-pointer {
  cursor:pointer;
}
</style>
