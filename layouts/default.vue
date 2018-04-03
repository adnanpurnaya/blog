<template>
  <v-app id="inspire">
    <Navigation :open.sync="drawer" />
    <v-content v-touch="{ 
        right: () => onSwipe('right'), 
        left: () => onSwipe('left') 
      }"
    >
      <span @click="onSwipeRight">asd</span>
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
    onSwipe(direction) {
      this.drawer = direction == 'right';
    }
  }
};
</script>