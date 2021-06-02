<template v-if="posts">
<div>
  <v-list class="pa-0 grey lighten-5" v-if="posts">
    <template v-for="(item, index) in posts">
      <v-list-item :key="item.id" class="px-1"
        @click="$router
        .push({path:`/posts/view/${item.id}`, query:{ category: item.category } })"
      >
        <template>
          <v-list-item-content class="d-flex">
            <p class="grey--text" v-if="category">
              {{titleToKorean(item.category)}}
            </p>
            <div class="d-flex text-truncate">
              <v-icon v-if="item.files && item.files.length > 0" small class=" mr-1">
                mdi-image
              </v-icon>
              <p class="my-1 text-truncate">
                {{item.title}}
              </p>
            </div>
            <div class="text-subtitle-2 subtitle">
              <span class="mr-2" v-if="item.poster">{{item.poster.userName}}</span>
              <span class="mr-2">{{formatDate(item.createdAt,{format:'HH:mm'})}}</span>
              <span class="mr-2">조회 {{item.views}}</span>
              <span class="mr-2">댓글 {{item.comments ? item.comments.length : 0}}</span>
            </div>
          </v-list-item-content>
        </template>
      </v-list-item>
      <v-divider
        v-if="index < posts.length - 1"
        :key="index"
      ></v-divider>
    </template>
  </v-list>
</div>
</template>
<script>
import dateMixins from '../mixins/dateMixins';
import translateMixins from '../mixins/translateMixins';

export default {
  mixins: [dateMixins, translateMixins],
  props: ['posts', 'category'],
  data: () => ({
  }),
};
</script>

<style lang="scss" scoped>
.subtitle {
  line-height:  0.8rem;
}
</style>
