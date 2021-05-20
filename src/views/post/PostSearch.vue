<template>
  <div>
    <div class="d-flex">
      <v-text-field
          v-model="keyword"
          outlined=""
          required
          placeholder="검색어"
          dense
        ></v-text-field>
      <v-btn @click="search" class="white--text py-2" height="40" color="red accent-2 " outlined>
        검색
      </v-btn>
    </div>
    <post-list v-if="posts" :posts="posts"></post-list>
  </div>
</template>

<script>
import PostList from '../../components/PostList3';

export default {
  components: { PostList },
  data() {
    return {
      keyword: '',
      posts: [],
    };
  },
  methods: {
    async search() {
      const payload = {
        keyword: this.keyword,
      };
      this.posts = await this.$store.dispatch('post/searchPosts', payload);
    },
  },
};
</script>
