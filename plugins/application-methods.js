import Vue from 'vue';
import { log } from 'util';

let ApplicationMethods = {};
const hari = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu"
];
const bulan = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember"
];

ApplicationMethods.install = function (Vue, options) {
  Vue.prototype.$applicationMethods = {
    formatDate(date) {
      const objDate = new Date(date);
      return hari[objDate.getDay()] + ", " +
        [objDate.getDate(), bulan[objDate.getMonth()], objDate.getFullYear()].join(" ");
    },
    firstParagraph(content) {
      if (!content) return content;
      // const paragraphs = content.match(/<p>(.+?)<\/p>/g);
      // const paragraphs = content.split("\n");
      // if (!paragraphs) return content;
      // return paragraphs[0];
      // return paragraphs.find(paragraph => paragraph != "");
      const length = 270;
      return content.length > length
        ? content.substring(0, length - 3) + "..."
        : content;
    }
  }
}

Vue.use(ApplicationMethods);