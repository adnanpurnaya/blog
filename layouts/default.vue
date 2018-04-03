<template>
  <v-app id="inspire">
    <Navigation :open="drawer" />
    <v-content v-touch="{ right: () => onSwipeRight() }">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<style>
article {
  white-space: pre-line;
}

.card * {
  text-decoration: none;
}
</style>

<script>
import Navigation from "~/components/Navigation";
import Footer from "~/components/Footer";

export default {
  components: {
    Navigation,
    Footer
  },
  data: () => ({
    year: new Date().getFullYear(),
    drawer: false
  }),
  methods: {
    onSwipeRight() {
      this.drawer = true;
    }
  }
};
</script>