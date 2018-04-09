<template>
  <v-btn icon @click="onShare" v-if="navigator.share">
    <v-icon>share</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    text: {
      type: String
    }
  },
  data: () => ({
    navigator: navigator
  }),
  methods: {
    onShare() {
      let url = document.location.href;
      const canonicalElement = document.querySelector("link[rel=canonical]");
      if (canonicalElement !== null) {
        url = canonicalElement.href;
      }
      if (this.navigator.share) {
        this.navigator
          .share({
            title: this.title,
            text: this.text,
            url: url
          })
          .then(() => console.log("Successful share"))
          .catch(error => console.log("Error sharing", error));
      }
    }
  }
};
</script>
