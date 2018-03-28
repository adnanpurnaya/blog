<template>
  <v-app id="inspire">
    <Navigation />
    <v-content>
      <v-container fluid fill-height>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; {{ year }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Navigation from "@/components/Navigation";

export default {
  components: {
    Navigation
  },
  data: () => ({
    year: new Date().getFullYear()
  })
};
</script>