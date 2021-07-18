<template>
  <ul
    id="scroll-target"
    style="max-height: 500px"
    class="overflow-y-auto px-0"
  >
    <li
      v-scroll:#scroll-target="onScroll"
      style="list-style-type: none;"
      class="pl-0"
      v-for="(chat, i) in activeChat" :key="i"
    >
      <div v-if="!chat.isNotification"
        :class="messageAlign(chat)"
        class="mt-4"
      >
        <v-avatar
          v-if="chat.userName !== user.userName"
          class="m-pointer"
          color="primary"
          size="30"
        >
          <img v-if="true"
            src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
            alt="John"
          >
          <span v-else class="white--text headline">
            {{chat.userName.slice(0,1).toUpperCase()}}
          </span>
        </v-avatar>

        <span
          v-if="chat.userName !== user.userName"
          class="text-subtitle-2"
        >
          {{chat.userName}}{{chat.createdAt}}
        </span>
      </div>
      <div v-if="!chat.isNotification" :class="messageAlign(chat)"
        class="mt-1 d-flex"
      >
        <div class="d-flex">
          <p v-if="chat.userName === user.userName" class="align-self-center mx-1">
            {{chatFormatDate(chat.createdAt, {format: 'hh:mm'})}}
          </p>

          <p class="grey lighten-2 rounded-lg px-3 py-1">
            {{chat.message}}
          </p>
        </div>
          <p v-if="chat.userName !== user.userName" class="align-self-center mx-1">
            {{chatFormatDate(chat.createdAt, {format: 'hh:mm'})}}
          </p>

      </div>
      <p v-else :class="messageAlign(chat)" class="my-1">
        {{chat.message}}
      </p>
    </li>
  </ul>
</template>
<script>
import dateMixins from '../mixins/dateMixins';
import translateMixins from '../mixins/translateMixins';

export default {
  mixins: [dateMixins, translateMixins],
  data() {
    return {
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
      return chat.userName === this.user.userName ? ' align-end flex-column' : '';
    },

  },
  updated() {
    this.$nextTick(() => this.scrollToEnd());
  },

  created() {
    this.$socket.on('message', (data) => {
      this.$store.dispatch('chat/addChat', data);
    });
    this.$socket.on('join2', (data) => {
      const topic = this.topicToKorean(data.topic);
      const message = this.user.userName === data.user.userName ? `${topic}에 입장하셨습니다` : `${data.user.userName}님이 입장하셨습니다`;
      const chat = {
        message,
        isNotification: true,
      };
      this.chat.push(chat);
      this.$store.dispatch('chat/fetchChat', data.chat);
      // TODO replace it with a better way
      setTimeout(() => {
        this.scrollToEnd();
      }, 0);
    });
  },
  computed: {
    user() {
      return this.$store.getters['auth/getAppUser'];
    },
    activeChat() {
      return this.$store.getters['chat/getActiveChat'];
    },
  },
};
</script>
