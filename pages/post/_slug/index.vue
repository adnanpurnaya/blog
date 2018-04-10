<template>
  <v-layout justify-center v-editable="storyblok">
    <v-flex md10>
      <Post 
        :img-url="post.imgUrl" 
        :content="post.content" 
        :title="post.title"
        :link="post.slug"
        :published-at="post.publishedAt"
        v-if="post"
        />
      <p style="font-size: 1.5rem" v-else>Post gagal ditampilkan</p>
      <v-btn flat icon 
        color="teal darken-1"
        :loading="loading"
        @click.native="loadData"
        :disabled="loading"
        v-if="!post"
        ><v-icon>cached</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import Post from "~/components/Post.vue";

// Check if we are in the editor mode
const VERSION = process.env.NODE_ENV == "development" ? "draft" : "published";

export default {
  components: {
    Post
  },
  data: () => ({
    loading: false
  }),
  asyncData(context) {
    // Load the JSON from the API
    return context.app.$storyapi
      .get("cdn/stories/post/" + context.params.slug, {
        version: VERSION
      })
      .then(res => {
        const post = res.data.story;
        return {
          post: {
            id: post.id,
            slug: post.slug,
            title: post.content.title,
            imgUrl: post.content.image,
            content: post.content.content,
            publishedAt: post.content.publishedAt
          },
          storyblok: res.data.story.content
        };
      })
      .catch(res => {
        if (res.code == "ECONNABORTED") {
          console.warn(res.message);
        } else {
          context.error({
            statusCode: res.response.status,
            message: res.response.data
          });
        }
        return { post: null, storyblok: null };
      });
  },
  methods: {
    loadData() {
      this.loading = true;
      this.$nuxt.$loading.start();
      // Load the JSON from the API
      this.$storyapi
        .get("cdn/stories/post/" + context.params.slug, {
          version: VERSION
        })
        .then(res => {
          this.loading = false;
          this.$nuxt.$loading.finish();

          const post = res.data.story;
          this.post = {
            id: post.id,
            slug: post.slug,
            title: post.content.title,
            imgUrl: post.content.image,
            content: post.content.content,
            publishedAt: post.content.publishedAt
          };
          this.storyblok = res.data.story.content;
        })
        .catch(res => {
          this.loading = false;
          this.$nuxt.$loading.finish();
          if (res.code == "ECONNABORTED") {
            console.warn(res.message);
          } else {
            context.error({
              statusCode: res.response.status,
              message: res.response.data
            });
          }
          this.post = null;
          this.storyblok = null;
        });
    }
  },
  mounted() {
    this.$storyblok.init();
    this.$storyblok.on("change", () => {
      location.reload(true);
    });
  }
};
</script>
