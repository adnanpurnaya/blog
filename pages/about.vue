<template>
  <v-layout row v-editable="storyblok">
    <v-flex xs12 sm6 offset-sm3 v-if="content">
      <v-card>
        <v-card-media :src="content.image" height="300px">
          <v-layout column class="media">
            <!-- <v-card-title>
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
            </v-card-title> -->
            <v-spacer></v-spacer>
            <v-card-title class="white--text pt-5">
              <div class="display-1 pt-5">{{ content.author }}</div>
            </v-card-title>
          </v-layout>
        </v-card-media>
        <v-list two-line>
          <v-list-tile v-for="email in content.emails" 
            tag="a" target="_top" 
            :key="email.address" 
            :href="'mailto:' + email.address + '?Subject=Hello%20Adnan'"
          >
            <v-list-tile-action>
              <v-icon color="teal lighten-1" v-if="email.icon">{{ email.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ email.address }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ email.type }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>
          <v-list-tile 
            tag="a" target="_blank" 
            :href="content.work.website"
          >
            <v-list-tile-action>
              <v-icon color="teal lighten-1">work</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ content.work.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ content.work.address }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex offset-md1 md10 v-else
      style="text-align:center" 
      class="grey--text text--darken-1 mt-5"
    >
      <p style="font-size: 3rem">:(</p> 
      <p style="font-size: 1.5rem">Halaman gagal ditampilkan</p>
      <v-btn flat icon 
        color="teal darken-1"
        :loading="loading"
        @click.native="loadData"
        :disabled="loading"
        ><v-icon>cached</v-icon>
      </v-btn>
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
// Check if we are in the editor mode
const VERSION = process.env.NODE_ENV == "development" ? "draft" : "published";

export default {
  data: () => ({
    loading: false
  }),
  asyncData(context) {
    // Load the JSON from the API
    return context.app.$storyapi
      .get("cdn/stories/about/", {
        version: VERSION
      })
      .then(res => {
        return {
          content: JSON.parse(res.data.story.content.body),
          storyblok: res.data.story.content
        };
      })
      .catch(res => {
        if (res.code == "ECONNABORTED") {
          console.warn(res.message);
        } else {
          context.error({
            statusCode: res.response.status,
            message: res.response.data
          });
        }
        return { content: null, storyblok: {} };
      });
  },
  methods: {
    loadData() {
      this.loading = true;
      this.$nuxt.$loading.start();
      // Load the JSON from the API
      this.$storyapi
        .get("cdn/stories/about/", {
          version: VERSION
        })
        .then(res => {
          this.loading = false;
          this.$nuxt.$loading.finish();

          this.content = JSON.parse(res.data.story.content.body);
          this.storyblok = res.data.story.content;
        })
        .catch(res => {
          this.loading = false;
          this.$nuxt.$loading.finish();
          if (res.code == "ECONNABORTED") {
            console.warn(res.message);
          } else {
            context.error({
              statusCode: res.response.status,
              message: res.response.data
            });
          }
          this.content = null;
          this.storyblok = {};
        });
    }
  },
  mounted() {
    this.$storyblok.init();
    this.$storyblok.on("change", () => {
      location.reload(true);
    });
  }
};
</script>
