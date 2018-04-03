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
      // const paragraphs = content.match(/<p>(.+?)<\/p>/g);
      if (!content) return content;
      const paragraphs = content.split("\n");
      if (!paragraphs) return content;
      // return paragraphs[0];
      return paragraphs.find(paragraph => paragraph != "");
    }
  }
}

Vue.use(ApplicationMethods);