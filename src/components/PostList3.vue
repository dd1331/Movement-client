<template>
<v-card>
  <v-list two-line>
      <v-list-item-group
        v-model="selected"
        active-class="pink--text"
        multiple
      >
        <template v-for="(item, index) in posts">
          <v-list-item :key="item.id">
            <!-- <template v-slot:default="{ active }"> -->
            <template>
              <v-list-item-content class="d-flex">
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <div>
                  <span>{{item.createdAt}}</span>
                  <span>조회{{item.views}}</span>
                  <span>댓글{{item.comments.length}}</span>
                </div>

                <!-- <v-list-item-subtitle
                  class="text--primary"
                  v-text="item.content"
                ></v-list-item-subtitle> -->

                <!-- <v-list-item-subtitle v-text="item.content">
                </v-list-item-subtitle> -->
              </v-list-item-content>

              <v-list-item-action>
                <!-- <v-list-item-action-text v-text="item.title"></v-list-item-action-text> -->

              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
            v-if="index < items.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
  </v-list>
  </v-card>
</template>
<script>
export default {
  props: [
    'posts',
  ],
  data: () => ({
    selected: [2],
    items: [
      {
        action: '15 min',
        headline: 'Brunch this weekend?',
        subtitle: 'I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?',
        title: 'Ali Connors',
      },
      {
        action: '2 hr',
        headline: 'Summer BBQ',
        subtitle: 'Wish I could come, but I\'m out of town this weekend.',
        title: 'me, Scrott, Jennifer',
      },
      {
        action: '6 hr',
        headline: 'Oui oui',
        subtitle: 'Do you have Paris recommendations? Have you ever been?',
        title: 'Sandra Adams',
      },
      {
        action: '12 hr',
        headline: 'Birthday gift',
        subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
        title: 'Trevor Hansen',
      },
      {
        action: '18hr',
        headline: 'Recipe to try',
        subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        title: 'Britta Holt',
      },
      {
        action: '18dhr',
        headline: 'Redcipe to try',
        subtitle: 'Wde should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        title: 'Brittda Holt',
      },
      {
        action: '18dhr',
        headline: 'Redcipe to try',
        subtitle: 'Wed should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        title: 'aritta Holt',
      },
      {
        action: '1a8hr',
        headline: 'Rescipe to try',
        subtitle: 'Wes should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        title: 'Brista Holt',
      },
      {
        action: '18hfr',
        headline: 'Recfipe to try',
        subtitle: 'Wef should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        title: 'Britfta Holt',
      },
    ],
  }),
};
</script>
