<template>
  <v-btn icon @click="onShare" v-if="navigatorShare">
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
    navigatorShare: navigator.share
  }),
  methods: {
    onShare() {
      let url = document.location.href;
      const canonicalElement = document.querySelector("link[rel=canonical]");
      if (canonicalElement !== null) {
        url = canonicalElement.href;
      }
      if (this.navigatorShare) {
        this.navigatorShare({
          title: this.title,
          text: this.text,
          url: url
        })
          .then(() => alert("Successful share"))
          .catch(error => alert("Error sharing", error));
      }
    }
  }
};
</script>
