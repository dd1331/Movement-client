<template>
  <div>
    <v-card class="d-flex">
      <div class="d-flex">
        <v-avatar
          class="ma-3 m-pointer"
          color="primary"
          size="70"
        >
          <img v-if="true"
            src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
            alt="John"
          >
          <span v-else class="white--text headline">
            {{user.userName.slice(0,1).toUpperCase()}}
          </span>
        </v-avatar>
        <div class="ma-4">
          <p>
            {{user.userName}}
          </p>
          <p>
            {{user.phone}}
          </p>
        </div>
      </div>
    </v-card>
    <v-card>
      <v-container class="d-flex">
        <v-container>
          <p>
            글
          </p>
            {{profile.postSum}}개
        </v-container>
        <v-container>
          <p>
            댓글
          </p>
          {{profile.commentSum}}개
        </v-container>
        <v-container>
          <p>
            좋아요
          </p>
          {{profile.likeSum}}개
        </v-container>
        <v-container>
          <p>
            싫어요
          </p>
          {{profile.dislikeSum}}개
        </v-container>
      </v-container>
      <!-- <v-container class="d-flex">
        <v-container>
          <p>
            팔로워
          </p>
          231
        </v-container>
        <v-container>
          <p>
            팔로잉
          </p>
          13
        </v-container>
      </v-container> -->
    </v-card>
  </div>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$store.getters['auth/getAppUser'];
    },
    profile() {
      return this.$store.getters['user/getProfile'];
    },
  },
  created() {
    this.$store.dispatch('user/fetchProfile', this.user.id);
  },
};
</script>
