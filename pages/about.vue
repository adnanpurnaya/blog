<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media src="/static/doc-images/lists/ali.png" height="300px">
          <v-layout column class="media">
            <v-card-title>
              <v-btn dark icon>
                <v-icon>chevron_left</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn dark icon class="mr-3">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn dark icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-title class="white--text pl-5 pt-5">
              <div class="display-1 pl-5 pt-5">Ali Conners</div>
            </v-card-title>
          </v-layout>
        </v-card-media>
        <v-list two-line>
          <v-list-tile v-for="email in emails" 
            tag="a" target="_top" 
            :key="email.address" 
            :href="'mailto:' + email.address + '?Subject=Hello%20Adnan'"
          >
            <v-list-tile-action>
              <v-icon color="indigo" v-if="email.icon">{{ email.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ email.address }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ email.type }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style>
.media {
  height: 100%;
  margin: 0;
}
</style>

<script>
export default {
  data: () => ({
    emails: [
      { address: "adnanpurnaya.com", type: "Personal", icon: "mail" },
      { address: "adnan.p@excelindo.co.id", type: "Work" }
    ]
  })
};
</script>
