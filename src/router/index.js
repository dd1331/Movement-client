import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import NaverCallback from '../views/NaverCallback.vue';
import PostList from '../views/post/PostList.vue';
import PostView from '../views/post/PostView.vue';
import PostForm from '../views/post/PostForm.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/auth/naver',
    name: 'NaverCallback',
    component: NaverCallback,
  },
  {
    path: '/posts/form/:category',
    name: 'PostForm',
    component: PostForm,
  },
  {
    path: '/posts/view/:id',
    name: 'PostView',
    component: PostView,
  },
  {
    path: '/posts/list/:category/:hashtagId?',
    name: 'Posts',
    component: PostList,
  },
  {
    path: '/posts/edit/:id',
    name: 'PostFormEdit',
    component: PostForm,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const currentCategory = store.getters['common/getCurrentCategory'];
  if (!currentCategory.title) {
    await store.dispatch('common/fetchCategories');
  }
  if (to.name === 'Home' && !to.params.category) {
    store.commit('common/setCurrentCategory', {});
  }

  // TODO choose which one to use. either params or query.
  // its considered to use query rather than params atm
  if (to.params.category !== from.params.category) {
    const payload = store.getters['common/getCategories'].find((category) => category.title === to.params.category);
    if (payload) {
      store.commit('common/setCurrentCategory', payload);
    }
  }
  if (to.query.category !== from.query.category) {
    const payload = store.getters['common/getCategories'].find((category) => category.title === to.query.category);
    if (payload) {
      store.commit('common/setCurrentCategory', payload);
    }
  }
  next();
});

export default router;
