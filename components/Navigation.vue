<template>
  <nav v-resize="initNavigation" v-scroll="onScroll">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
      temporary
    >
      <v-list>
        <v-list-tile 
          ripple
          active-class="grey lighten-3 teal--text text--lighten-1"
          v-for="menu in menus" 
          :key="menu.link" 
          nuxt 
          :to="menu.link" 
          :exact="menu.exact" 
          >
          <v-list-tile-action>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ menu.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <transition name="fade" >
      <v-toolbar color="teal lighten-1" dark fixed app v-show="visible" :class="paddingLeft">
        <v-btn v-if="showPost && (!search || $vuetify.breakpoint.mdAndUp)" @click.stop="redirectBack" icon class="hidden-md-and-up"><v-icon color="">arrow_back</v-icon></v-btn>
        <v-toolbar-side-icon v-if="!showPost && (!search || $vuetify.breakpoint.mdAndUp)" class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <nuxt-link to="/" class="white--text" style="text-decoration: none" v-show="appName != 'Post' && (!search || $vuetify.breakpoint.mdAndUp)">
          <span style="font-size: 1rem;" v-html="'&#123;&#123;...&#125;&#125;'"></span>
        </nuxt-link>
        <v-toolbar-title class="ml-1" v-if="!search || $vuetify.breakpoint.mdAndUp">
          <nuxt-link to="/" class="white--text" style="text-decoration: none">
            {{ appName }}
          </nuxt-link>
        </v-toolbar-title>
        <v-spacer v-if="!search || $vuetify.breakpoint.mdAndUp"></v-spacer>
        <Search style="width:300px" :back-icon="$vuetify.breakpoint.smAndDown" v-if="search || $vuetify.breakpoint.mdAndUp" @search-close="search = false" />
        <v-spacer class="hidden-sm-and-down"></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn 
            flat 
            v-for="menu in menus" 
            :key="menu.link" 
            nuxt 
            :to="menu.link" 
            :exact="menu.exact"
            >
            <v-icon class="mr-1">{{ menu.icon }}</v-icon> {{ menu.text }}
          </v-btn>
        </v-toolbar-items>
        <v-btn icon class="hidden-md-and-up" @click="search = true" v-if="!search">
          <v-icon>search</v-icon>
        </v-btn>
        <NavigatorShare class="hidden-md-and-up" :title="postTitle" v-if="showPost && !search"/>
      </v-toolbar>
    </transition>
  </nav>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<script>
import config from "~/config";
import Search from "~/components/Search";
import { EventBus } from "~/plugins/event-bus.js";
import NavigatorShare from "~/components/NavigatorShare";

export default {
  components: {
    NavigatorShare,
    Search
  },
  props: {
    open: {
      type: Boolean
    }
  },
  data: () => ({
    appName: "",
    showPost: false,
    menus: [
      { text: "Home", link: "/", icon: "home", exact: true },
      // { text: "Post", link: "/post", icon: "library_books", exact: false },
      { text: "About", link: "/about", icon: "contact_mail", exact: true }
    ],
    visible: true,
    lastOffsetTop: 0,
    search: false,
    postTitle: null
  }),
  methods: {
    redirectBack() {
      this.$router.go(-1);
    },
    initNavigation(routeName) {
      routeName = routeName || this.$route.name;
      this.showPost = routeName == "post-slug";
      this.appName =
        routeName == "post-slug" && !this.$vuetify.breakpoint.mdAndUp
          ? "Post"
          : config.app.name;
    },
    onScroll() {
      const offsetTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (offsetTop < this.lastOffsetTop) {
        this.visible = true;
      } else if (offsetTop > 60 && offsetTop > this.lastOffsetTop) {
        this.visible = false;
      } else {
        this.visible = true;
      }
      this.lastOffsetTop = offsetTop;
    }
  },
  computed: {
    paddingLeft() {
      let padding = "";

      if (this.$vuetify.breakpoint.mdAndUp) padding = "pl-5";

      return padding;
    },
    drawer: {
      get() {
        return this.open;
      },
      set(val) {
        this.$emit("update:open", val);
      }
    }
  },
  mounted() {
    this.initNavigation();
    EventBus.$once("show-post", title => {
      this.postTitle = title;
    });
  },
  watch: {
    $route(to, from) {
      this.initNavigation(to.name);
    }
  }
};
</script>
