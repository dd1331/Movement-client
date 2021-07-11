<template>
  <v-container
    id="scroll-target"
    style="max-height: 500px"
    class="overflow-y-auto"
  >
    <div
      v-scroll:#scroll-target="onScroll"
      :style="chat.userName === user.userName ? 'height:35px' : 'height:65px'"
      v-for="(chat, i) in chat" :key="i"
    >
      <div v-if="!chat.isNotification"
        :class="messageAlign(chat)"
      >
        <v-avatar
          v-if="chat.userName !== user.userName"
          class="m-pointer"
          color="primary"
          size="30"
        >
          <img v-if="chat.avatar"
            :src="comment.commenter.avatar"
            alt="John"
          >
          <span v-else class="white--text headline">
            {{chat.userName.slice(0,1).toUpperCase()}}
          </span>
        </v-avatar>

        <span v-if="chat.userName !== user.userName">
          {{chat.userName}}
        </span>
      </div>
      <p v-if="!chat.isNotification" :class="messageAlign(chat)"
        class="mt-1"
      >
        {{chat.message}} {{formatDate(chat.createdAt, {format: 'MM/DD'})}}
      </p>
      <p v-else :class="messageAlign(chat)" class="my-1">
        {{chat.message}}
      </p>
    </div>
  </v-container>
</template>
<script>
import dateMixins from '../mixins/dateMixins';
import translateMixins from '../mixins/translateMixins';

export default {
  mixins: [dateMixins, translateMixins],
  data() {
    return {
      chat: [],
    };
  },
  methods: {
    onScroll() {
    },
    scrollToEnd() {
      this.$el.scrollTop = this.$el.lastElementChild.offsetTop;
    },
    messageAlign(chat) {
      if (chat.isNotification) return 'text-center';
      return chat.userName === this.user.userName ? 'text-right' : '';
    },

  },
  updated() {
    this.$nextTick(() => this.scrollToEnd());
  },

  created() {
    this.$socket.on('message', (data) => {
      this.chat.push(data);
    });
    this.$socket.on('join2', (data) => {
      const topic = this.topicToKorean(data.topic);
      const message = this.user.userName === data.user.userName ? `${topic}에 입장하셨습니다` : `${data.user.userName}님이 입장하셨습니다`;
      const chat = {
        message,
        isNotification: true,
      };
      this.chat.push(chat);
    });
  },
  computed: {
    user() {
      return this.$store.getters['auth/getAppUser'];
    },
  },
};
</script>
