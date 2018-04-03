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