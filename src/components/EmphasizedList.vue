<template>
  <div>
    <v-list class="pa-0 mt-3 grey lighten-5">
      <template v-for="(item, index) in posts">
        <div :key="item.id" class="ma-1"
          @click="$router
          .push({path:`/posts/view/${item.id}`, query:{ category: item.category } })"
        >
          <template>
            <div class="d-flex">
              <p class="my-0 red--text text--accent-1 font-weight-bold text-truncate">
                {{item.title}}
              </p>
              <v-spacer></v-spacer>
              <v-chip small outlined>{{item.likeCount}}</v-chip>
            </div>
          </template>
        </div>
        <v-divider
          v-if="index < posts.length - 1"
          :key="index"
        ></v-divider>
      </template>
    </v-list>
    <v-divider></v-divider>
  </div>
</template>
<script>
export default {
  props: ['posts'],
  data() {
    return {
    };
  },
};
</script>
