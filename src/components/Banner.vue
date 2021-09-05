<template>
  <div style="padding-left:0.5rem">
    <v-container style="width:17rem; height:20rem" class="grey lighten-3">
      <h4>실시간 인기 게시판</h4>
      <div class="d-flex" v-for="i in 7" :key="i">
        <v-icon class="mb-1">
          mdi-fire
        </v-icon>
        <p class="my-2">test</p>
      </div>
    </v-container>
    <v-container style="width:17rem; height:15rem; margin-top:2rem" class="grey lighten-3">
      <h4>실시간 인기 검색어</h4>
      <div class="d-flex" v-for="i in 5" :key="i">
        <v-icon class="mb-1">
          mdi-fire
        </v-icon>
        <p class="my-2">test</p>
      </div>
    </v-container>
  </div>
</template>
<script>
export default {

};
</script>
