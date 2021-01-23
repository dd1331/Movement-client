<template>
  <v-row>
    <v-col
      v-for="n in 6"
      :key="n"
      class="ma-0 py-0"
      cols="4"
    >
      <v-card>

        <v-img
          :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
          :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
          aspect-ratio="1"  width="100"
          class="grey lighten-2"
        >
          <!-- <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >dasdd
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              >123</v-progress-circular>
            </v-row>
          </template> -->
        </v-img>
      </v-card>
      <span>ss</span>
    </v-col>
  </v-row>
</template>
