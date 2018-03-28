<template>
  <v-card class="my-3 pa-4">
    <v-card-title primary-title>
      <div style="width:100%">
        <h3 class="headline mb-0">{{ title }}</h3>
        <v-divider class="my-2" />
        <span class="grey--text">
          <icon name="clock-o" scale="0.7"></icon> {{ $applicationMethods.formatDate(publishedAt) }}
        </span>
      </div>
    </v-card-title>
    <v-card-media class="mx-3" height="250px" :src="imgUrl"></v-card-media>
    <v-card-text>
      {{ content }}
    </v-card-text>
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

