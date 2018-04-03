<template>
  <v-layout row wrap v-scroll="onScroll">
    <v-flex v-if="posts.length > 0" v-for="post in posts" :key="post.id" md6 lg4>
      <PreviewPost 
        :img-url="post.imgUrl" 
        :content="post.content" 
        :title="post.title"
        :link="post.slug"
        :published-at="post.publishedAt"
      />
    </v-flex>
    <v-flex 
      v-if="posts.length == 0" 
      class="grey--text text--darken-1 mt-5" 
      style="text-align:center"
    >
      <p style="font-size: 3rem">:(</p> 
      <p style="font-size: 1.5rem">Maaf, untuk saat ini belum ada post untuk ditampilkan.</p>
    </v-flex>
    <v-flex style="text-align:center" v-if="loading">
      <v-progress-circular :size="size" indeterminate color="primary"></v-progress-circular>
    </v-flex>
    <v-snackbar bottom color="teal darken-1" v-model="noMoreData">
      Semua post telah ditampilkan
      <v-btn flat color="grey lighten-3" @click.native="noMoreData = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import PreviewPost from "~/components/PreviewPost";

const PER_PAGE = 6;

export default {
  components: {
    PreviewPost
  },
  data: () => ({
    loading: false,
    noMoreData: false
  }),
  asyncData(context) {
    // Check if we are in the editor mode
    let version =
      context.query._storyblok || context.isDev ? "draft" : "published";

    // Load the JSON from the API
    return context.app.$storyapi
      .get("cdn/stories/", {
        starts_with: "post",
        sort_by: "content.publishedAt:desc",
        per_page: PER_PAGE,
        version: version
      })
      .then(res => {
        return {
          posts: res.data.stories.map(post => {
            return {
              id: post.id,
              slug: post.full_slug,
              title: post.content.title,
              imgUrl: post.content.image,
              content: post.content.content,
              publishedAt: post.content.publishedAt
            };
          }),
          total: res.total
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
        return { posts: [], total: 0 };
      });
  },
  methods: {
    onScroll(event) {
      const offsetTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (offsetTop == docHeight) {
        this.loadMore();
      }
    },
    loadMore() {
      // Check if we are in the editor mode
      // let version =
      // this.$route.query._storyblok ? "draft" : "published";
      let version = "draft";
      if (this.loading) {
        return;
      }
      if (this.posts.length >= this.total) {
        this.noMoreData = true;
        return;
      }
      this.loading = true;
      this.$nuxt.$loading.start();

      // // Load the JSON from the API
      return this.$storyapi
        .get("cdn/stories/", {
          starts_with: "post",
          sort_by: "content.publishedAt:desc",
          per_page: PER_PAGE,
          page: Math.ceil(this.posts.length / PER_PAGE) + 1,
          version: version
        })
        .then(res => {
          this.loading = false;
          this.$nuxt.$loading.finish();
          res.data.stories.map(post => {
            let newPost = {
              id: post.id,
              slug: post.full_slug,
              title: post.content.title,
              imgUrl: post.content.image,
              content: post.content.content,
              publishedAt: post.content.publishedAt
            };
            this.posts.push(newPost);
          });
        })
        .catch(res => {
          this.loading = false;
          this.$nuxt.$loading.finish();
          if (res.code == "ECONNABORTED") {
            console.warn(res.message);
          } else {
            this.$nuxt.error({
              statusCode: res.response.status,
              message: res.response.data
            });
          }
        });
    }
  },
  computed: {
    size() {
      return this.$vuetify.breakpoint.smAndDown ? 32 : 40;
    }
  }
};
</script>
