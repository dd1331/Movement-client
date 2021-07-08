<template>
  <div>
    <div>
      <v-btn @click="join">match</v-btn>
      <v-select
        v-model="selected"
        :items="items"
        label="주제"
        dense
      ></v-select>
      <v-container
        id="scroll-target"
        style="max-height: 1000px"
        class="overflow-y-auto"
      >
        <div
          v-scroll:#scroll-target="onScroll"
          style="height: 40px"
          v-for="(chat, i) in chat" :key="i"
        >
          <p :class="i % 2 === 1 ?'text-right' : ''">
            {{chat.userName}} {{chat.message}} {{formatDate(chat.createdAt, {format: 'MM/DD'})}}
          </p>
        </div>
      </v-container>
      <v-text-field
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
import dateMixins from '../mixins/dateMixins';

export default {
  mixins: [dateMixins],
  data() {
    return {
      roomIds: [],
      items: ['plogging', 'running', 'coding'],
      selected: 'plogging',
      message: '',
      chat: [],
    };
  },
  created() {
    this.$socket.on('message', (data) => {
      this.chat.push(data);
    });
    this.$socket.on('join', (data) => {
      this.roomIds.push(data.id);
      this.$store.dispatch('chat/addRoom');
    });
  },
  methods: {
    send() {
      // if (this.$socket.disconnected) this.$socket.connect();
      const user = { roomId: this.roomIds[0], message: this.message ? this.message : 'message to romm' };
      this.$socket.emit('match', user);
      this.message = '';
    },
    join() {
      const user = { location: 'etst', topic: this.selected };

      this.$socket.emit('joinRoom', user);
    },
    disconnect() {
      this.$socket.disconnect();
    },
  },

};
</script>
