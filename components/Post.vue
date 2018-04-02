<template>
  <v-card class="my-3 pa-3">
    <v-card-title primary-title>
      <div style="width:100%">
        <h3 class="headline mb-0">{{ title }}</h3>
        <v-divider class="my-2" />
        <span class="grey--text">
          <icon name="clock-o" scale="0.7"></icon> {{ $applicationMethods.formatDate(publishedAt) }}
        </span>
      </div>
    </v-card-title>
    <v-card-media class="mx-3" height="250px" :src="imgUrl || defaultImage"></v-card-media>
    <article class="pa-3">
      {{ content }}
    </article>
    <v-card-actions>
      <ShareButton :text="title" />
    </v-card-actions>
  </v-card>
</template>

<script>
import ShareButton from "~/components/ShareButton";
import * as config from "~/config";

export default {
  components: {
    ShareButton
  },
  data: () => ({
    defaultImage: config.DEFAULT_IMAGE
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
  }
};
</script>

