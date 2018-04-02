<template>
  <v-card class="ma-3" hover>
    <nuxt-link :to="link">
      <v-card-media height="200px" :src="imgUrl || defaultImage"></v-card-media>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ title }}</h3>
          <span class="grey--text">
            <icon name="clock-o" scale="0.7"></icon> {{ $applicationMethods.formatDate(publishedAt) }}
          </span>
          <article>{{ $applicationMethods.firstParagraph(content) }}</article>
        </div>
      </v-card-title>
      <!-- <article class="px-3 pt-0 pb-3">
        {{ $applicationMethods.firstParagraph(content) }}
      </article> -->
    </nuxt-link>
    <v-card-actions>
      <ShareButton :text="title" />
      <v-spacer></v-spacer>
      <v-btn flat class="blue--text" nuxt :to="link">Read More</v-btn>
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

