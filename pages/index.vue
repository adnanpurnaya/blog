<template>
  <v-layout v-bind="binding" justify-center>
    <v-flex v-for="post in posts" :key="post.id" md10 offset-md1 lg12 offset-lg0>
      <PreviewPost 
        :img-url="post.imgUrl" 
        :content="post.content" 
        :title="post.title"
        :link="post.slug"
        :published-at="post.publishedAt"
        />
    </v-flex>
  </v-layout>
</template>

<script>
import PreviewPost from "~/components/PreviewPost";

export default {
  components: {
    PreviewPost
  },
  asyncData(context) {
    // Check if we are in the editor mode
    let version =
      context.query._storyblok || context.isDev ? "draft" : "published";

    // Load the JSON from the API
    return context.app.$storyapi
      .get("cdn/stories/", {
        starts_with: "post",
        version: version
      })
      .then(res => {
        return {
          posts: res.data.stories.map(post => {
            return {
              id: post.id,
              slug: post.slug,
              title: post.content.title,
              imgUrl: post.content.image,
              content: post.content.content,
              publishedAt: post.content.publishedAt
            };
          })
        };
      })
      .catch(res => {
        context.error({
          statusCode: res.response.status,
          message: res.response.data
        });
        return { posts: [] };
      });
  },
  computed: {
    binding() {
      const binding = {};

      if (this.$vuetify.breakpoint.mdAndDown) binding.column = true;

      return binding;
    }
  }
};
</script>
