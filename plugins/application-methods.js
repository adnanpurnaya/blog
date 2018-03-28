import Vue from 'vue';
import { log } from 'util';

let ApplicationMethods = {};

ApplicationMethods.install = function (Vue, options) {
  Vue.prototype.$applicationMethods = {
    formatDate(date) {
      const objDate = new Date(date);
      return objDate.toLocaleDateString("id");
    },
    firstParagraph(content) {
      const paragraph = content.match(/<p>(.+?)<\/p>/g);
      if (!paragraph) return content;
      return paragraph[0];
    }
  }
}

Vue.use(ApplicationMethods);