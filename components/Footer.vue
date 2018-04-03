<template>
  <v-footer color="teal lighten-1" app>
      <v-layout row wrap align-center>
        <v-flex xs12>
          <div class="white--text ml-3">
            Made with
            <v-icon class="pink--text text--lighten-2">favorite</v-icon>
            by <nuxt-link to="/" class="white--text">{{ author }}</nuxt-link>
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
</template>


<script>
import { author } from "~/config";

export default {
  data: () => ({
    author
  })
};
</script>
