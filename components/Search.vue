<template>
  <v-layout row align-center style="width: 100%" class="ml-3 mr-3">
    <v-select
      placeholder="Search..."
      autocomplete
      :loading="loading"
      append-icon="search"
      :items="filterPosts(posts)"
      :search-input.sync="search"
      v-model="select"
      color="white"
      item-text="title"
      item-value="slug"
      clearable
      style="white-space: nowrap"
      :prepend-icon="backIcon ? 'keyboard_backspace' : null"
      :prepend-icon-cb="searchClose"
      ref="select"
    >
      <template slot="item" slot-scope="data">
        <v-list-tile-avatar>
          <img :src="data.item.imgUrl || defaultImage">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ data.item.shortTitle }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ $applicationMethods.formatDate(data.item.publishedAt) }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </template>
    </v-select>
  </v-layout>
</template>

<style>
.list__tile--active {
  color: rgba(0, 0, 0, 0.87) !important;
  background: rgba(0, 0, 0, 0.12) !important;
}
.list__tile--highlighted {
  background: rgba(255, 255, 255);
}
.list li {
  padding: 5px 0;
}
</style>


<script>
import config from "~/config";

export default {
  props: {
    backIcon: {
      type: Boolean
    }
  },
  data() {
    return {
      loading: false,
      posts: [],
      search: null,
      select: null,
      defaultImage: config.default_image
    };
  },
  watch: {
    search(val) {
      val && this.querySelections(val);
    },
    select(val) {
      for (let i = 0; i < this.posts.length; i++) {
        if (this.posts[i].slug == val) {
          this.$router.push(`/${val}`);
          this.posts = [this.posts[i]];
          setTimeout(() => this.$refs.select.blur(), 200);
          break;
        }
      }
    }
  },
  methods: {
    searchClose() {
      this.$emit("search-close");
    },
    shortTitle(title) {
      const length = 55;
      return title.length > length
        ? title.substring(0, length - 3) + "..."
        : title;
    },
    filterPosts(posts) {
      return posts
        .filter(post => {
          return (
            (post.title || "")
              .toLowerCase()
              .indexOf((this.search || "").toLowerCase()) > -1
          );
        })
        .slice(0, 5);
    },
    transformPosts(posts) {
      return posts.map(post => {
        return {
          id: post.id,
          slug: post.full_slug,
          title: post.content.title,
          shortTitle: this.shortTitle(post.content.title),
          imgUrl: post.content.image,
          publishedAt: post.content.publishedAt
        };
      });
    },
    querySelections(v) {
      this.loading = true;
      // Load the JSON from the API
      this.$storyapi
        .get("cdn/stories/", {
          starts_with: "post",
          sort_by: "content.publishedAt:desc",
          excluding_fields: "content",
          version: process.env.NODE_ENV == "development" ? "draft" : "published"
        })
        .then(res => {
          this.posts = this.transformPosts(res.data.stories);
          this.loading = false;
        })
        .catch(res => {
          if (res.code == "ECONNABORTED") {
            console.warn(res.message);
          } else {
            console.error(res.response.data);
          }
          this.loading = false;
        });
    }
  }
};
</script>
