<template>
  <v-menu bottom left>
    <v-btn icon slot="activator" dark>
      <v-icon>more_vert</v-icon>
    </v-btn>
    <v-list>
      <v-subheader style="height: auto" class="mb-1">
        <icon name="share-alt" class="mr-1" /> Share
      </v-subheader>
      <v-divider />
      <v-list-tile v-for="item in socialMedia" 
        v-if="item.enabled" 
        :key="item.name"
        tag="a"
        :href="onShare(item.shareUrl)"
        target="_blank"
      >
        <v-list-tile-action :class="item.textColor">
          <icon :name="item.icon" scale="1.5"></icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.name"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>


<script>
export default {
  props: {
    text: {
      type: String
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
        .replace("{text}", this.text || "")
        .replace("{app_id}", 794470737419485)
        .replace("{redirect_url}", currentUrl)
        .replace("{page_type}", "popup");
    }
  }
};
</script>
