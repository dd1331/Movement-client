<template>
  <v-app id="app">
    <Header></Header>

    <v-main>
      <Home/>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Home from './views/Home';
import Header from './components/Header';
import Footer from './components/Footer';

export default {
  name: 'App',

  components: {
    Home,
    Header,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>
