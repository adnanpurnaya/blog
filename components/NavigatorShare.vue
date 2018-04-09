<template>
  <v-btn icon @click="onShare" v-if="navigator.share" :class="className">
    <v-icon>share</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      default: ""
    },
    title: {
      type: String
    },
    text: {
      type: String
    },
    className: {
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
        this.navigator.share({
          title: this.title,
          text: this.text,
          url: url + this.link
        });
      }
    }
  }
};
</script>
