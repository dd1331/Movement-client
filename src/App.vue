<template>
  <!-- <v-app id="app">

    <v-main>
    </v-main>
  </v-app> -->

  <v-app>
    <!-- <v-navigation-drawer app>
    </v-navigation-drawer> -->

    <!-- <v-app-bar app> -->
    <Header></Header>
    <!-- </v-app-bar> -->

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view>
          <!-- <Home/> -->
        </router-view>
      </v-container>
    </v-main>

    <Footer></Footer>
  </v-app>
</template>

<script>
// import Home from './views/Home';
import Header from './components/Header';
import Footer from './components/Footer';

export default {
  name: 'App',

  components: {
    // Home,
    Header,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>
