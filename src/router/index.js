import Vue from 'vue';
import VueRouter from 'vue-router';
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
    path: '/posts',
    name: 'Posts',
    component: PostList,
  },
  {
    path: '/posts/form',
    name: 'PostForm',
    component: PostForm,
  },
  {
    path: '/posts/edit/:id',
    name: 'PostForm',
    component: PostForm,
  },
  {
    path: '/posts/:id',
    name: 'PostView',
    component: PostView,
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

export default router;
