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
import PostSearch from '../views/post/PostSearch.vue';
import Profile from '../views/user/Profile.vue';

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
    meta: { role: 'public' },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { role: 'public' },
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
    meta: { requiresAuth: true },
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
    path: '/posts/search',
    name: 'Posts',
    component: PostSearch,
  },
  {
    path: '/posts/edit/:id',
    name: 'PostFormEdit',
    component: PostForm,
    meta: { requiresAuth: true },
  },
  {
    path: '/user/profile',
    name: 'UserProfile',
    component: Profile,
    meta: { requiresAuth: true },
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
  const user = store.getters['auth/getAppUser'];
  if (to.meta.role === 'public' && user) next(from);

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
  // TODO find out a way not to show error message for redireciting comprehensively
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters['auth/getAppUser']) {
      next({
        path: '/login',
        // query: { redirect: to.fullPath },
      });
      return;
    }
  }
  next();
});

export default router;
