<template>
  <v-layout justify-center>
    <v-flex md10>
      <Post 
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
import Post from "~/components/Post.vue";

export default {
  components: {
    Post
  },
  asyncData(context) {
    // Check if we are in the editor mode
    let version =
      context.query._storyblok || context.isDev ? "draft" : "published";

    // Load the JSON from the API
    return context.app.$storyapi
      .get("cdn/stories/post/" + context.params.slug, {
        version: version
      })
      .then(res => {
        var post = res.data.story;
        return {
          post: {
            id: post.id,
            slug: post.slug,
            title: post.content.title,
            imgUrl: post.content.image,
            content: post.content.content,
            publishedAt: post.content.publishedAt
          }
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
        return { post: null };
      });
  }
};
</script>
