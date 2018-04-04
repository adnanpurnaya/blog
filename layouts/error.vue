<template>
  <v-layout >
    <v-flex style="text-align:center; margin-top: 30px">
      <img src="~/static/icon.png" alt="Adnanp Blog" style="height: 100px">
      <h1 class="grey--text text--darken-1" style="font-weight: lighter; font-size: 40px" v-if="error.statusCode === 404">Page not found</h1>
      <h1 class="grey--text text--darken-1" style="font-weight: lighter; font-size: 40px" v-else>An error occurred</h1>
      <nuxt-link to="/" class="teal--text text--lighten-1">Home page</nuxt-link>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["error"],
  layout: "default" // you can set a custom layout for the error page
};
</script>