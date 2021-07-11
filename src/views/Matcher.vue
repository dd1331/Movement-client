<template>
  <div>
    <div>
      <v-btn v-if="!activeRoom" @click="join">match</v-btn>
      <v-select v-if="!activeRoom"
        class="mt-10"
        v-model="selected"
        :items="items"
        label="주제"
        dense
      ></v-select>
      <p v-if="activeRoom">{{topicToKorean(activeRoom.topic)}}</p>
      <p v-if="activeRoom">{{totalClient}}</p>
      <chat></chat>
      <v-text-field
        v-if="activeRoom"
        v-model="message"
        dense
        placeholder="메시지"
        clearable
        @keyup.enter="send"
      >
      </v-text-field>
    </div>
  </div>
</template>

<script>
import translateMixins from '../mixins/translateMixins';
import Chat from '../components/Chat';

export default {
  components: { Chat },
  mixins: [translateMixins],
  data() {
    return {
      roomIds: [],
      items: ['plogging', 'running', 'coding'],
      selected: 'plogging',
      message: '',
      totalClient: 0,
    };
  },
  created() {
    this.$socket.on('join', (data) => {
      this.roomIds.push(data.id);
      this.$store.dispatch('chat/addRoom', data);
      this.$store.dispatch('chat/setActiveRoom', data);
    });
    this.$socket.on('join2', (data) => {
      this.totalClient = data.totalClient;
    });
  },
  computed: {
    activeRoom() {
      return this.$store.getters['chat/getActiveRoom'];
    },
    user() {
      return this.$store.getters['auth/getAppUser'];
    },
  },
  methods: {
    send() {
      // if (this.$socket.disconnected) this.$socket.connect();
      if (!this.message) return;
      const user = {
        roomId: this.roomIds[0],
        message: this.message ? this.message : 'message to romm',
        user: this.user,
      };
      this.$socket.emit('match', user);
      this.message = '';
    },
    join() {
      const user = { location: 'etst', topic: this.selected, user: this.user };

      this.$socket.emit('joinRoom', user);
    },
    disconnect() {
      this.$socket.disconnect();
    },
  },

};
</script>
