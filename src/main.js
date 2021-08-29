import Vue from 'vue';
import axios from 'axios';
import { config } from 'dotenv';
// import io from 'socket.io-client';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

// const socket = io('http://localhost:3000');

config();

Vue.config.productionTip = false;
Vue.config.errorHandler = () => {
  // console.log('err', err);
  // console.log('vm', vm);
  // console.log('info', info);
  // handle error
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in. Only available in 2.2.0+
};
Vue.prototype.$axios = axios;
// Vue.prototype.$socket = socket;

store.$axios = axios;
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
