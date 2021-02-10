<template>
  <div>
    <div v-for="comment in post.comments" v-bind:key="comment.id">
      <ul>
        {{comment.content}}
        {{comment.createdAt}}
        {{comment.like}}
        {{comment.dislike}}
        {{comment.commenter.userName}}
      </ul>
      <!-- <ul>{{item.content}}</ul> -->
      <v-divider></v-divider>
    </div>
    <!-- <ul>tes</ul>
    <v-divider></v-divider>
    <ul>tes</ul>
    <v-divider></v-divider>
    <ul>tes</ul>
    <v-divider></v-divider>
    <ul>tes</ul>
    <v-divider></v-divider> -->
  </div>
</template>
<script>
export default {
  computed: {
    post() {
      return this.$store.getters['post/getActivePost'];
    },
  },
};
</script>
