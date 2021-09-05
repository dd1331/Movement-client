<template>
  <v-app>
    <Header></Header>
    <v-container :style="wrapper" style="padding:0">
      <v-container style="display: flex">
        <v-main :style="innerWrapper">
          <div>
            <router-view/>
          </div>
        </v-main>
        <Banner v-if="!isMobile"/>
      </v-container>
    </v-container>
    <Footer></Footer>
    <v-snackbar v-model="snackbar">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>
<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';

export default {
  name: 'App',

  components: {
    Header,
    Footer,
    Banner,
  },
  data() {
    return {
      snackbar: false,
      message: '',

    };
  },
  async created() {
    await this.$store.dispatch('common/fetchCategories');
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.mobile;
    },
    wrapper() {
      return `margin-left: auto; margin-right: auto; ${this.isMobile ? '' : 'max-width: 70rem;'}`;
    },
    innerWrapper() {
      return `margin-right: auto; ${this.isMobile ? '' : 'width:10%;'}`;
    },
  },
  errorCaptured(err) {
    const { message } = err.response.data;
    this.message = message;
    this.snackbar = true;
  },
};
</script>
