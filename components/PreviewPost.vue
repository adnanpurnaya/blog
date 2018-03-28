<template>
  <v-card class="ma-3" hover nuxt :to="link">
    <v-card-media height="200px" :src="imgUrl"></v-card-media>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ title }}</h3>
        <span class="grey--text">
          <icon name="clock-o" scale="0.7"></icon> {{ $applicationMethods.formatDate(publishedAt) }}
        </span>
        <div>{{ $applicationMethods.firstParagraph(content) }}</div>
      </div>
    </v-card-title>
    <!-- <v-card-text>
      {{ firstParagraph(content) }}
    </v-card-text> -->
    <v-card-actions>
      <v-btn icon class="light-blue--text">
        <icon name="telegram" scale="1.5"></icon>
      </v-btn>
      <v-btn icon class="green--text">
        <icon name="whatsapp" scale="1.5"></icon>
      </v-btn>
      <v-btn icon class="light-blue--text">
        <icon name="twitter" scale="1.5"></icon>
      </v-btn>
      <v-btn icon class="blue--text text--darken-4">
        <icon name="facebook-f" scale="1.5"></icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn flat class="blue--text">Read More</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
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

