<template>
  <div>
    <v-list class="pa-0 mt-3">
      <template v-for="(item, index) in posts">
        <div :key="item.id" class="ma-1"
          @click="$router
          .push({path:`/posts/view/${item.id}`, query:{ category: item.category } })"
        >
          <template>
            <div class="d-flex">
              <p class="my-0 red--text text--accent-1 font-weight-bold">{{item.title}}</p>
              <v-spacer></v-spacer>
              <v-chip small outlined>{{item.view}}</v-chip>
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
  data() {
    return {
      posts: [
        {
          title: '부모님 연세가 어떻게 돼',
          view: 33312,
          id: 43,
        }, {
          title: '너 백팩샀어? 말하면서 들어와봐',
          view: 3333,
          id: 44,
        }, {
          title: '지에스25 논란 난거 어떻게 생각해?',
          view: 23,
          id: 45,
        }, {
          title: '저 오늘 2주년인데 쳐 자고 있음',
          view: 3333413,
          id: 46,
        }, {
          title: '이거 절대 먹지마 최악이야',
          view: 9,
          id: 46,
        }],
    };
  },
};
</script>
