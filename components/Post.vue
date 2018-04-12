<template>
  <v-card class="my-3 pa-3">
    <v-card-title primary-title>
      <div style="width:100%">
        <h3 class="headline mb-0 teal--text text--lighten-1">{{ title }}</h3>
        <v-divider class="my-2" />
        <span class="grey--text">
          <icon name="clock-o" scale="0.7"></icon> {{ $applicationMethods.formatDate(publishedAt) }}
        </span>
      </div>
    </v-card-title>
    <v-card-media class="mx-3" height="250px" :src="imgUrl || defaultImage"></v-card-media>
    <article class="pa-3" v-html="content"></article>
  </v-card>
</template>

<style>
/* article p {
  margin-bottom: 0;
}
 */
 article ol li {
   margin-left: 16px;
 }
article ol {
  list-style-position: inside;
}
article img:not(.original-size) {
  width: 100%;
}
article img.padding-img {
  padding: 0 8%;
}
article pre {
  padding: 16px;
  background-color: #eceff1;
}
</style>


<script>
import config from "~/config";
import { EventBus } from "~/plugins/event-bus.js";

export default {
  data: () => ({
    defaultImage: config.default_image
  }),
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    imgUrl: {
      type: String,
      required: true
    },
    publishedAt: {
      type: String
    }
  },
  mounted() {
    EventBus.$emit("show-post", this.title);
  },
  destroyed() {
    EventBus.$off();
  }
};
</script>

