<template>
  <v-app>
    <Header></Header>
    <v-main style="padding:0;">
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
