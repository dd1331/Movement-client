<template>
  <div>
    <section class="d-flex align-center">
      <h1 v-if="currentCategory">{{title}}</h1>
      <v-chip v-if="hashtagTitle"
        class="mx-3 "
        small
        color="red"
        outlined
      >
        {{hashtagTitle}}
      </v-chip>
      <v-spacer></v-spacer>
      <v-btn v-if="!isNews" small class="red accent-2"
        @click="sendTo(currentCategory.title)">
        <span class="white--text ">글쓰기</span>
      </v-btn>

    </section>
    <section>
      <news-list v-if="isNews"></news-list>
      <emphasized-list v-if="!isNews && !hashtagTitle" :posts="emphasizedPosts"></emphasized-list>
      <post-list-component v-if="!isNews" :posts="posts"></post-list-component>
      <p class="text-center" v-if="!hasMore">no more data</p>
    <div v-intersect.quiet="infiniteScrolling"></div>
    </section>
  </div>
</template>
<script>

import VUE_APP_SERVER_HOST from '@/../env-config';
import PostListComponent from '../../components/PostList3';
import EmphasizedList from '../../components/EmphasizedList';
import NewsList from '../../components/NewsList';

export default {
  data() {
    return {
      page: 1,
      hasMore: true,
    };
  },
  methods: {
    sendTo(title) {
      this.$router.push(`/posts/form/${title}`).catch(() => {});
    },
    infiniteScrolling(_, __, c) {
      if (!c || this.isNews) return;
      setTimeout(() => {
        this.page += 1;
        this.$axios.get(`${VUE_APP_SERVER_HOST}/posts`, { params: this.payload }).then((response) => {
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
    await this.$store.dispatch('post/fetchEmphasizedPosts', { category: this.payload.category });
  },
  async beforeRouteUpdate(_, __, next) {
    this.page = 1;
    await this.$store.dispatch('post/fetchCategorizedPosts', this.payload);
    await this.$store.dispatch('post/fetchEmphasizedPosts', { category: this.payload.category });

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and O
    this.hasMore = true;
    next();
  },
  computed: {
    title() {
      if (this.hashtagId) return '# 검색';
      return this.currentCategory.koTitle;
    },
    hashtagId() {
      return this.$route.query.hashtagId;
    },
    hashtagTitle() {
      return this.$route.query.hashtagTitle;
    },
    payload() {
      return {
        category: this.currentCategory.title,
        page: this.page,
        hashtagId: this.hashtagId,
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
    emphasizedPosts() {
      return this.$store.getters['post/getEmphasizedPosts'];
    },
    user() {
      return this.$store.getters['auth/getAppUser'];
    },
  },

  components: { PostListComponent, NewsList, EmphasizedList },

};
</script>
