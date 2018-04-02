<template>
  <div>
    <v-btn icon 
      v-for="sosmed in socialMedia" 
      v-if="sosmed.enabled" 
      :key="sosmed.name" 
      :class="sosmed.textColor" 
      tag="a" 
      :href="onShare(sosmed.shareUrl)"
      target="_blank"
    >
      <icon :name="sosmed.icon" scale="1.5"></icon>
    </v-btn>
  </div>
</template>


<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data: () => ({
    socialMedia: [
      {
        name: "Facebook",
        shareUrl: "https://www.facebook.com/dialog/share?app_id={app_id}&display={page_type}&href={url}&redirect_uri={redirect_url}",
        icon: "facebook-f",
        textColor: "blue--text text--darken-4",
        enabled: false
      },
      {
        name: "Twitter",
        shareUrl: "https://twitter.com/intent/tweet?url={url}&text={text}",
        icon: "twitter",
        textColor: "light-blue--text",
        enabled: true
      },
      {
        name: "Telegram",
        shareUrl: "https://telegram.me/share/url?url={url}&text={text}",
        icon: "telegram",
        textColor: "light-blue--text",
        enabled: true
      }
    ]
  }),
  methods: {
    onShare(url) {
      const currentUrl = window.location.origin + this.$route.fullPath;
      return url
        .replace("{url}", currentUrl)
        .replace("{text}", this.text)
        .replace("{app_id}", 794470737419485)
        .replace("{redirect_url}", currentUrl)
        .replace("{page_type}", "popup");
    }
  }
};
</script>
