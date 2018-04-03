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
      <v-toolbar color="teal lighten-1" dark fixed app v-show="visible">
        <v-btn v-if="showPost" @click.stop="redirectBack" icon class="hidden-md-and-up"><v-icon color="">arrow_back</v-icon></v-btn>
        <v-toolbar-side-icon v-else class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>{{ appName }}</v-toolbar-title>
        <v-spacer></v-spacer>
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
        <!-- <ShareMenu class="hidden-md-and-up"/> -->
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
// import ShareMenu from "~/components/ShareMenu";
import config from "~/config";

export default {
  components: {
    // ShareMenu
  },
  data: () => ({
    appName: "",
    drawer: null,
    showPost: false,
    menus: [
      { text: "Home", link: "/", icon: "home", exact: true },
      // { text: "Post", link: "/post", icon: "library_books", exact: false },
      { text: "About", link: "/about", icon: "contact_mail", exact: true }
    ],
    visible: true,
    lastOffsetTop: 0
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
  mounted() {
    this.initNavigation();
  },
  watch: {
    $route(to, from) {
      this.initNavigation(to.name);
    }
  }
};
</script>
