<template>
  <v-menu bottom left>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="callEdit">
        <v-icon class="mr-2">
          mdi-pencil
        </v-icon>
        <span>수정</span>
      </v-list-item>
      <v-list-item @click="callDelete">
        <v-icon class="mr-2">
          mdi-delete
        </v-icon>
        <span>삭제</span>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  methods: {
    callEdit() {
      this.$emit('onEdit');
    },
    callDelete() {
      this.$emit('onDelete');
    },
  },

};
</script>

<style>

</style>
