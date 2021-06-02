<template>
  <v-app :style="pcLayoutTemp">
    <Header></Header>
    <v-main class="grey lighten-5">
      <v-container fluid>
        <router-view>
        </router-view>
      </v-container>
    </v-main>
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
import Header from './components/Header';
import Footer from './components/Footer';

export default {
  name: 'App',

  components: {
    Header,
    Footer,
  },
  data() {
    return {
      snackbar: false,
      message: '',
      // TODO PC UI
      pcLayoutTemp: 'width:375px;margin-left: auto; margin-right: auto;',
    };
  },
  async created() {
    await this.$store.dispatch('common/fetchCategories');
  },
  errorCaptured(err) {
    const { message } = err.response.data;
    this.message = message;
    this.snackbar = true;
  },
};
</script>
