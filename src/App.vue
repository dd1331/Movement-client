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
  created() {
    this.$store.dispatch('common/fetchCategories');
  },
};
</script>
