webpackJsonp([1],{"+ptz":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{directives:[{name:"scroll",rawName:"v-scroll",value:t.onScroll,expression:"onScroll"}],attrs:{row:"",wrap:""}},[t._l(t.posts,function(e){return t.posts.length>0?n("v-flex",{key:e.id,attrs:{md6:"",lg4:""}},[n("PreviewPost",{attrs:{"img-url":e.imgUrl,content:e.content,title:e.title,link:e.slug,"published-at":e.publishedAt}})],1):t._e()}),0==t.posts.length?n("v-flex",{staticClass:"grey--text text--darken-1 mt-5",staticStyle:{"text-align":"center"}},[n("p",{staticStyle:{"font-size":"3rem"}},[t._v(":(")]),t.aborted?n("p",{staticStyle:{"font-size":"1.5rem"}},[t._v("Halaman gagal ditampilkan")]):n("p",{staticStyle:{"font-size":"1.5rem"}},[t._v("Maaf, untuk saat ini belum ada post untuk ditampilkan.")]),t.aborted?n("v-btn",{attrs:{flat:"",icon:"",color:"teal darken-1",loading:t.loadingData,disabled:t.loadingData},nativeOn:{click:function(e){return t.loadData(e)}}},[n("v-icon",[t._v("cached")])],1):t._e()],1):t._e(),t.loading?n("v-flex",{staticStyle:{"text-align":"center"}},[n("v-progress-circular",{attrs:{size:t.size,indeterminate:"",color:"primary"}})],1):t._e(),n("v-snackbar",{attrs:{bottom:"",color:"teal darken-1"},model:{value:t.noMoreData,callback:function(e){t.noMoreData=e},expression:"noMoreData"}},[t._v("\n    Semua post telah ditampilkan\n    "),n("v-btn",{attrs:{flat:"",color:"grey lighten-3"},nativeOn:{click:function(e){t.noMoreData=!1}}},[t._v("Close")])],1)],2)};a._withStripped=!0;var i={render:a,staticRenderFns:[]};e.a=i},"/TYz":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("fDbS"),i=n("+ptz"),s=n("VU/8")(a.a,i.a,!1,null,null,null);s.options.__file="pages/index.vue",e.default=s.exports},"82z9":function(t,e,n){var a=n("lPNp");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("rjj0")("afc2de80",a,!1,{sourceMap:!1})},Elab:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{staticClass:"ma-3",attrs:{hover:""}},[n("nuxt-link",{attrs:{to:t.link}},[n("v-card-media",{attrs:{height:"200px",src:t.imgUrl||t.defaultImage}}),n("v-card-title",{attrs:{"primary-title":""}},[n("div",{style:t.style},[n("h3",{staticClass:"headline mb-0 teal--text text--lighten-1"},[t._v(t._s(t.title))]),n("span",{staticClass:"grey--text"},[n("icon",{attrs:{name:"clock-o",scale:"0.7"}}),t._v(" "+t._s(t.$applicationMethods.formatDate(t.publishedAt))+"\n        ")],1),n("article",{domProps:{innerHTML:t._s(t.$applicationMethods.firstParagraph(t.content))}})])])],1),n("v-card-actions",[n("NavigatorShare",{attrs:{link:t.link,title:t.title,className:"teal--text text--lighten-1"}}),n("v-spacer"),n("v-btn",{staticClass:"teal--text text--lighten-1",attrs:{flat:"",nuxt:"",to:t.link}},[t._v("Read More")])],1)],1)};a._withStripped=!0;var i={render:a,staticRenderFns:[]};e.a=i},FAg7:function(t,e,n){"use strict";var a=n("FhoZ"),i=n.n(a),s=n("nHDJ");e.a={components:{NavigatorShare:s.a},data:function(){return{defaultImage:i.a.default_image}},props:{title:{type:String,required:!0},content:{type:String,required:!0},link:{type:String,required:!0},imgUrl:{type:String,required:!0},publishedAt:{type:String}},computed:{style:function(){var t={};return this.$vuetify.breakpoint.mdAndUp&&(t.height="200px"),t}}}},FhoZ:function(t,e){t.exports={app:{name:"Adnanp Blog",short_name:"Adnanp Blog",description:"A simply readable Web Development Blog app.",color:"#00796B"},author:"Adnan Purnaya",default_image:"/blog/default-image.jpg"}},ME01:function(t,e,n){"use strict";e.a={props:{link:{type:String,default:""},title:{type:String},text:{type:String},className:{type:String}},data:function(){return{navigator:navigator}},methods:{onShare:function(){var t=document.location.href,e=document.querySelector("link[rel=canonical]");null!==e&&(t=e.href),this.navigator.share&&this.navigator.share({title:this.title,text:this.text,url:t+this.link})}}}},fDbS:function(t,e,n){"use strict";var a=n("pwef");e.a={components:{PreviewPost:a.a},data:function(){return{loading:!1,noMoreData:!1,loadingData:!1}},asyncData:function(t){return t.app.$storyapi.get("cdn/stories/",{starts_with:"post",sort_by:"content.publishedAt:desc",per_page:6,version:"published"}).then(function(t){return{posts:t.data.stories.map(function(t){return{id:t.id,slug:t.full_slug,title:t.content.title,imgUrl:t.content.image,content:t.content.content,publishedAt:t.content.publishedAt}}),total:t.total,aborted:!1}}).catch(function(e){var n=!1;return"ECONNABORTED"==e.code?(n=!0,console.warn(e.message)):t.error({statusCode:e.response.status,message:e.response.data}),{posts:[],total:0,aborted:n}})},methods:{onScroll:function(t){(window.pageYOffset||document.documentElement.scrollTop)==document.documentElement.scrollHeight-window.innerHeight&&this.loadMore()},loadData:function(){var t=this;this.loadingData=!0,this.$nuxt.$loading.start(),this.$storyapi.get("cdn/stories/",{starts_with:"post",sort_by:"content.publishedAt:desc",per_page:6,version:"published"}).then(function(e){t.loadingData=!1,t.$nuxt.$loading.finish(),t.posts=e.data.stories.map(function(t){return{id:t.id,slug:t.full_slug,title:t.content.title,imgUrl:t.content.image,content:t.content.content,publishedAt:t.content.publishedAt}}),t.total=e.total,t.aborted=!1}).catch(function(e){t.loadingData=!1,t.$nuxt.$loading.finish();var n=!1;"ECONNABORTED"==e.code?(n=!0,console.warn(e.message)):context.error({statusCode:e.response.status,message:e.response.data}),t.posts=[],t.total=0,t.aborted=n})},loadMore:function(){var t=this;if(!this.loading){if(!(this.posts.length>=this.total))return this.loading=!0,this.$nuxt.$loading.start(),this.$storyapi.get("cdn/stories/",{starts_with:"post",sort_by:"content.publishedAt:desc",per_page:6,page:Math.ceil(this.posts.length/6)+1,version:"published"}).then(function(e){t.loading=!1,t.$nuxt.$loading.finish(),e.data.stories.map(function(e){var n={id:e.id,slug:e.full_slug,title:e.content.title,imgUrl:e.content.image,content:e.content.content,publishedAt:e.content.publishedAt};t.posts.push(n)})}).catch(function(e){t.loading=!1,t.$nuxt.$loading.finish(),"ECONNABORTED"==e.code?console.warn(e.message):t.$nuxt.error({statusCode:e.response.status,message:e.response.data})});this.noMoreData=!0}}},computed:{size:function(){return this.$vuetify.breakpoint.smAndDown?32:40}}}},lPNp:function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,"article p{margin-bottom:0}",""])},nHDJ:function(t,e,n){"use strict";var a=n("ME01"),i=n("poBg"),s=n("VU/8")(a.a,i.a,!1,null,null,null);s.options.__file="components/NavigatorShare.vue",e.a=s.exports},poBg:function(t,e,n){"use strict";var a=function(){var t=this.$createElement,e=this._self._c||t;return this.navigator.share?e("v-btn",{class:this.className,attrs:{icon:""},on:{click:this.onShare}},[e("v-icon",[this._v("share")])],1):this._e()};a._withStripped=!0;var i={render:a,staticRenderFns:[]};e.a=i},pwef:function(t,e,n){"use strict";var a=n("FAg7"),i=n("Elab"),s=!1;var o=function(t){s||n("82z9")},r=n("VU/8")(a.a,i.a,!1,o,null,null);r.options.__file="components/PreviewPost.vue",e.a=r.exports}});