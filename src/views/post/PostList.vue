<template>
  <div>
    <section class="d-flex">
      <h1 v-if="currentCategory">{{currentCategory.koTitle}}</h1>
      <v-spacer></v-spacer>
      <v-btn v-if="!isNews" small="" @click="$router.push('/posts/form')">글쓰기</v-btn>

    </section>
    <section>
      <news-list v-if="isNews"></news-list>
      <post-list-component v-else :posts="posts"></post-list-component>
      <p class="text-center" v-if="!hasMore">no more data</p>
    <div v-intersect.quiet="infiniteScrolling"></div>
    </section>
  </div>
</template>
<script>
import axios from 'axios';
import PostListComponent from '../../components/PostList3';
import NewsList from '../../components/NewsList';

export default {
  data() {
    return {
      page: 1,
      hasMore: true,
    };
  },
  methods: {
    infiniteScrolling(_, __, c) {
      if (!c || this.isNews) return;
      setTimeout(() => {
        this.page += 1;
        axios.get('http://localhost:3000/posts/readAll', { params: this.payload }).then((response) => {
          if (response.data.length > 1) {
            this.$store.commit('post/accumulatePosts', response.data);
            return;
          }
          if (response.data.length === 0) {
            this.hasMore = false;
          }
        })
          .catch((err) => {
            console.log(err);
          });
      }, 500);
    },
  },
  async created() {
    await this.$store.dispatch('post/fetchCategorizedPosts', this.payload);
  },
  beforeRouteUpdate(_, __, next) {
    this.page = 1;
    this.$store.dispatch('post/fetchCategorizedPosts', this.payload);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and O
    next();
  },
  computed: {
    payload() {
      return {
        category: this.currentCategory.title,
        page: this.page,
      };
    },
    isNews() {
      return this.$route.params.category === 'news';
    },
    currentCategory() {
      return this.$store.getters['common/getCurrentCategory'];
    },
    posts() {
      return this.$store.getters['post/getPosts'];
    },
  },

  components: { PostListComponent, NewsList },

};
</script>
