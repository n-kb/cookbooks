(function(t){function e(e){for(var o,a,i=e[0],r=e[1],l=e[2],d=0,f=[];d<i.length;d++)a=i[d],Object.prototype.hasOwnProperty.call(c,a)&&c[a]&&f.push(c[a][0]),c[a]=0;for(o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o]);u&&u(e);while(f.length)f.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],o=!0,i=1;i<n.length;i++){var r=n[i];0!==c[r]&&(o=!1)}o&&(s.splice(e--,1),t=a(a.s=n[0]))}return t}var o={},c={app:0},s=[];function a(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=o,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(n,o,function(e){return t[e]}.bind(null,o));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/cookbooks/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],r=i.push.bind(i);i.push=e,i=i.slice();for(var l=0;l<i.length;l++)e(i[l]);var u=r;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"28cf":function(t,e,n){},"454b":function(t,e,n){"use strict";n("5990")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("7a23"),c={class:"section"},s={class:"container"},a={class:"columns"},i={class:"column is-one-quarter"},r=Object(o["f"])("div",{class:"block content"},[Object(o["f"])("h1",{class:"title"},"Cookbooks explorer"),Object(o["f"])("p",null,"Search word frequencies (case-insensitive) in lots of cookbooks! "),Object(o["f"])("p",null,[Object(o["e"])("Share any interesting findings on Twitter "),Object(o["f"])("a",{href:"https://twitter.com/nicolaskb"},"@nicolaskb"),Object(o["e"])(" or over e-mail hi@nkb.fr, and "),Object(o["f"])("a",{href:"https://github.com/n-kb/cookbooks"},"do read the methodology.")])],-1),l={class:"block"},u={class:"column"},d={class:"block"},f={class:"block"},b={class:"block"};function h(t,e,n,h,p,O){var j=Object(o["i"])("Facets"),v=Object(o["i"])("Search"),g=Object(o["i"])("Loader"),k=Object(o["i"])("Viz"),m=Object(o["i"])("DownloadCSV");return Object(o["g"])(),Object(o["c"])("section",c,[Object(o["f"])("div",s,[Object(o["f"])("div",a,[Object(o["f"])("div",i,[r,Object(o["f"])("div",l,[Object(o["f"])(j,{onFacetChange:O.setBooks,onIsLoading:O.setFacetsLoading},null,8,["onFacetChange","onIsLoading"])])]),Object(o["f"])("div",u,[Object(o["f"])("div",d,[Object(o["f"])(v,{activeBooks:p.activeBooks,onResults:O.setResults,onIsLoading:O.setSearchLoading},null,8,["activeBooks","onResults","onIsLoading"])]),Object(o["f"])("div",f,[O.isLoading?(Object(o["g"])(),Object(o["c"])(g,{key:0,isLoading:O.isLoading},null,8,["isLoading"])):Object(o["d"])("",!0),Object(o["f"])(k,{results:p.results,isLoading:O.isLoading},null,8,["results","isLoading"])]),Object(o["f"])("div",b,[O.isLoading?Object(o["d"])("",!0):(Object(o["g"])(),Object(o["c"])(m,{key:0,results:p.results},null,8,["results"]))])])])])])}n("ac1f"),n("841c");var p={class:"field has-addons"},O={class:"control is-expanded"},j={class:"control"},v={key:0,class:"notification is-danger"};function g(t,e,n,c,s,a){return Object(o["g"])(),Object(o["c"])(o["a"],null,[Object(o["f"])("div",p,[Object(o["f"])("div",O,[Object(o["l"])(Object(o["f"])("input",{"onUpdate:modelValue":e[1]||(e[1]=function(t){return s.query=t}),disabled:1==s.isLoading,class:[{"is-loading":1==s.isLoading},"input is-expanded"],onKeyup:e[2]||(e[2]=Object(o["m"])((function(t){return a.search()}),["enter"])),type:"text",placeholder:"Keyword"},null,42,["disabled"]),[[o["k"],s.query]])]),Object(o["f"])("div",j,[Object(o["f"])("a",{class:"button is-info",onClick:e[3]||(e[3]=function(t){return a.search()}),type:"submit"}," Search ")])]),s.error?(Object(o["g"])(),Object(o["c"])("div",v,[Object(o["f"])("button",{class:"delete",onClick:e[4]||(e[4]=function(t){return s.error=!1})}),Object(o["e"])(" There was an error: "+Object(o["j"])(s.errorMessage),1)])):Object(o["d"])("",!0)],64)}n("a15b");var k=n("bc3a"),m=n.n(k),y={props:["activeBooks"],data:function(){return{query:"tomate, tomaten, tomates",isLoading:!1,error:!1,errorMessage:""}},watch:{activeBooks:function(){this.search()}},mounted:function(){this.search()},methods:{search:function(){var t=this;this.isLoading=!0,this.$emit("isLoading",!0);var e="https://cookbooks-api.herokuapp.com/";m()({method:"GET",url:e+"search?ids="+this.activeBooks.join()+"&q="+this.query.toLowerCase(),headers:{"Access-Control-Allow-Origin":"*","Content-type":"application/json"}}).then((function(e){t.isLoading=!1,t.$emit("isLoading",!1),t.$emit("results",e.data)})).catch((function(e){t.errorMessage=e,t.error=!0}))}}};y.render=g;var w=y,F={key:0,class:"notification is-warning"},L=Object(o["e"])(" Your search returned no results. ");function S(t,e,n,c,s,a){return Object(o["g"])(),Object(o["c"])(o["a"],null,[s.noResults?(Object(o["g"])(),Object(o["c"])("div",F,[Object(o["f"])("button",{class:"delete",onClick:e[1]||(e[1]=function(t){return s.noResults=!1})}),L])):Object(o["d"])("",!0),Object(o["f"])("div",{id:"viz",ref:"viz",class:{invisible:n.isLoading}},null,2)],64)}n("159b"),n("fb6a");var B=n("898b"),x={props:["results","isLoading"],data:function(){return{noResults:!1}},watch:{results:function(t){this.makeViz(t)}},methods:{makeViz:function(t){var e=this.$refs.viz.clientWidth,n={top:10,right:30,bottom:30,left:60},o=e-n.left-n.right,c=400-n.top-n.bottom,s=document.querySelector("#viz");[].slice.call(s.children).forEach((function(t){return s.removeChild(t)}));var a=B["i"]("#viz").append("svg").attr("width",o+n.left+n.right).attr("height",c+n.top+n.bottom).append("g").attr("transform","translate("+n.left+","+n.top+")"),i=t.aggregate_results;if(0==i)return this.noResults=!0,!1;this.noResults=!1;var r=t.lowess,l=B["i"]("body").append("div").style("opacity",0).attr("class","tooltip"),u=function(t,e){l.style("opacity",1).style("left",t.pageX+10+"px").style("top",t.pageY+"px").html("<em>"+e.title+"</em><br>Publication year: "+e.pub_year),B["i"](this).style("stroke","black").style("opacity",1)},d=function(){l.style("opacity",0),B["i"](this).style("stroke","none").style("opacity",.8)},f=B["f"](i,(function(t){return+t.pub_year})),b=B["g"](i,(function(t){return+t.pub_year})),h=B["f"](i,(function(t){return+t.frequency})),p=B["h"]().domain([b-5,f+5]).range([0,o]);a.append("g").attr("transform","translate(0,"+c+")").call(B["b"](p).tickFormat(B["d"]("d")));var O=B["h"]().domain([0,h+.001]).range([c,0]);if(a.append("g").call(B["c"](O)),i.length>=10){var j=B["a"]().x((function(t){return p(t.year)})).y0((function(t){return O(t.ul)})).y1((function(t){return t.ll>0?O(t.ll):O(0)}));a.append("path").datum(r).attr("fill","#ccc").attr("stroke","steelblue").attr("stroke-width",0).style("opacity",.2).attr("d",j),a.append("path").datum(r).attr("fill","none").attr("stroke","steelblue").attr("stroke-width",1.5).attr("d",B["e"]().x((function(t){return p(t.year)})).y((function(t){return O(t.lowess)})))}a.append("g").selectAll("dot").data(i).enter().append("circle").attr("cx",(function(t){return p(t.pub_year)})).attr("cy",(function(t){return O(t.frequency)})).attr("r",5).style("fill","#69b3a2").on("mouseover",u).on("mouseleave",d)}}};n("454b");x.render=S;var C=x;function z(t,e,n,c,s,a){var i=Object(o["i"])("facet");return Object(o["g"])(),Object(o["c"])(o["a"],null,[Object(o["f"])(i,{title:"Language",items:s.languages,activeBooks:s.activeBooks,defaultOpen:!0,onSetFacets:a.setFacets},null,8,["items","activeBooks","onSetFacets"]),Object(o["f"])(i,{title:"Type",items:s.types,activeBooks:s.activeBooks,defaultOpen:!0,onSetFacets:a.setFacets},null,8,["items","activeBooks","onSetFacets"]),Object(o["f"])(i,{title:"Publication country",items:s.countries,activeBooks:s.activeBooks,defaultOpen:!1,onSetFacets:a.setFacets},null,8,["items","activeBooks","onSetFacets"]),Object(o["f"])(i,{title:"Series",items:s.series,activeBooks:s.activeBooks,defaultOpen:!1,onSetFacets:a.setFacets},null,8,["items","activeBooks","onSetFacets"]),Object(o["f"])(i,{title:"Publication city",items:s.cities,activeBooks:s.activeBooks,defaultOpen:!1,onSetFacets:a.setFacets},null,8,["items","activeBooks","onSetFacets"])],64)}n("caad"),n("2532"),n("07ac"),n("d3b7"),n("1276"),n("b0c0");var q={class:"block"},A={class:"card"},V={class:"card-header"},_={class:"card-header-title"},D={class:"card-header-icon","aria-label":"more options"},P=Object(o["f"])("i",{class:"fas fa-angle-down","aria-hidden":"true"},null,-1),T=Object(o["f"])("i",{class:"fas fa-angle-up","aria-hidden":"true"},null,-1),M={key:0,class:"card-content"},R={class:"content"},E={key:0,class:"columns"},$={class:"column"},I={class:"is-size-7"},K={key:0,class:"column is-one-quarter has-text-right"},G=Object(o["f"])("span",{class:"tag is-info is-size-7"}," reset ",-1);function J(t,e,n,c,s,a){return Object(o["g"])(),Object(o["c"])("div",q,[Object(o["f"])("div",A,[Object(o["f"])("header",V,[Object(o["f"])("p",_,Object(o["j"])(n.title),1),Object(o["f"])("button",D,[0==s.facetOpen?(Object(o["g"])(),Object(o["c"])("span",{key:0,class:"icon",onClick:e[1]||(e[1]=function(t){return s.facetOpen=!0})},[P])):Object(o["d"])("",!0),1==s.facetOpen?(Object(o["g"])(),Object(o["c"])("span",{key:1,class:"icon",onClick:e[2]||(e[2]=function(t){return s.facetOpen=!1})},[T])):Object(o["d"])("",!0)])]),1==s.facetOpen?(Object(o["g"])(),Object(o["c"])("div",M,[Object(o["f"])("div",R,[(Object(o["g"])(!0),Object(o["c"])(o["a"],null,Object(o["h"])(n.items,(function(t,c){return Object(o["g"])(),Object(o["c"])("div",{key:c},[t.name.length>0?(Object(o["g"])(),Object(o["c"])("div",E,[Object(o["f"])("div",$,[Object(o["f"])("a",{onClick:function(e){return a.activateFacet(n.title,t.ids,c)},class:{active:s.activeFacet===c}},[Object(o["e"])(Object(o["j"])(t.name)+" ",1),Object(o["f"])("span",I," ("+Object(o["j"])(a.intersection(t.ids,n.activeBooks).length)+"/"+Object(o["j"])(t.ids.length)+") ",1)],10,["onClick"])]),s.activeFacet===c?(Object(o["g"])(),Object(o["c"])("div",K,[Object(o["f"])("a",{onClick:e[3]||(e[3]=function(t){return a.resetFacet()})},[G])])):Object(o["d"])("",!0)])):Object(o["d"])("",!0)])})),128))])])):Object(o["d"])("",!0)])])}var U=n("2909"),Y={props:["title","items","activeBooks","defaultOpen"],data:function(){return{activeFacet:void 0,facetOpen:this.defaultOpen}},computed:{allIds:function(){var t=[];return Object.values(this.items).forEach((function(e){t.push.apply(t,Object(U["a"])(e.ids))})),t}},methods:{activateFacet:function(t,e,n){this.activeFacet=n,this.$emit("setFacets",t,e)},resetFacet:function(){this.activateFacet(this.title,this.allIds,void 0)},intersection:function(t,e){for(var n=[],o=0;o<t.length;o++)e.includes(t[o])&&n.push(t[o]);return n}}};n("e023");Y.render=J;var N=Y,W={components:{Facet:N},data:function(){return{books:[],activeBooks:[],activeFacets:{},countries:{},cities:{},types:{},languages:{},series:{}}},methods:{setFacets:function(t,e){this.activeFacets[t]=e,this.setBooks(),this.$emit("facetChange",this.activeBooks)},setBooks:function(){var t=function(t,e){for(var n=[],o=0;o<t.length;o++)e.includes(t[o])&&n.push(t[o]);return n},e=function(){for(var e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];for(var c=n[0].slice(),s=1;s<n.length;s++)c=t(c,n[s]);return c},n=[];Object.values(this.activeFacets).forEach((function(t){n.push(t)})),this.activeBooks=e.apply(void 0,n)}},mounted:function(){var t=this,e="https://cookbooks-api.herokuapp.com/";m()({method:"GET",url:e+"/list",headers:{"Access-Control-Allow-Origin":"*","Content-type":"application/json"}}).then((function(e){t.$emit("isLoading",!1),t.books=e.data,t.books.forEach((function(e){t.activeBooks.push(e.id);var n=function(t,n){e[t].split(", ").forEach((function(t){void 0==n[t]&&(n[t]={name:t,ids:[]}),n[t]["ids"].push(e.id)}))};n("country",t.countries),n("pub_city",t.cities),n("language",t.languages),n("series",t.series),n("type",t.types)}))})).catch((function(t){console.log(t)})).finally((function(){}))}};W.render=z;var X=W,Z={class:"has-text-right"},H=Object(o["f"])("button",{class:"button"},[Object(o["f"])("span",null,"Download data as CSV")],-1);function Q(t,e,n,c,s,a){return Object(o["g"])(),Object(o["c"])("p",Z,[Object(o["f"])("a",{ref:"download",onClick:e[1]||(e[1]=function(){return a.makeCSV&&a.makeCSV.apply(a,arguments)})},[H],512)])}n("b64b");var tt={props:["results"],methods:{makeCSV:function(){function t(t){var e,n,o,c,s,a;return a=t.data||null,null!=a&&a.length?(c=t.columnDelimiter||",",s=t.lineDelimiter||"\n",o=Object.keys(a[0]),e="",e+=o.join(c),e+=s,a.forEach((function(t){n=0,o.forEach((function(o){n>0&&(e+=c),e+='"'+t[o]+'"',n++})),e+=s})),e):null}var e="data:text/csv;charset=utf-8,"+t({data:this.results.results}),n=encodeURI(e),o=this.results.query.join("+");this.$refs.download.setAttribute("href",n),this.$refs.download.setAttribute("download",o+".csv")}}};tt.render=Q;var et=tt,nt={class:"columns"},ot={class:"content column is-half is-offset-one-quarter"},ct=Object(o["f"])("h1",null,"Loading...",-1),st={key:0,class:"message is-info"},at={class:"message-body"},it=Object(o["f"])("p",null,[Object(o["f"])("b",null,"Did you know...")],-1),rt={class:"is-size-6"};function lt(t,e,n,c,s,a){return Object(o["g"])(),Object(o["c"])("div",nt,[Object(o["f"])("div",ot,[ct,s.showDidyouknow?(Object(o["g"])(),Object(o["c"])("article",st,[Object(o["f"])("div",at,[it,Object(o["f"])("p",null,Object(o["j"])(s.didyouknowText),1),Object(o["f"])("p",rt,"Source: "+Object(o["j"])(s.didyouknowSource)+".",1)])])):Object(o["d"])("",!0)])])}var ut={props:["isLoading"],data:function(){return{didyouknow:[{text:"that Anna Barnekow, chef in Lübeck, always mixed béchamel sauce in her mayonnaise?",source:"Norddeutsches Kochbuch (1902), p. 25"},{text:"that Augustin Carême, a jingoist French chef, called Vienna the second-best city for cooking after Paris?",source:"Le maitre-d'hôtel français (1842), p. 215"},{text:"that David Amman, a neo neo-Zoroastrian, recommended using coconut milk to replace mother milk?",source:"Mazdaznan (1909), p. 71"}],showDidyouknow:!1,didyouknowText:"",didyouknowSource:""}},mounted:function(){var t=this;this.showDidyouknow=!1,setTimeout((function(){var e=Math.floor(Math.random()*t.didyouknow.length);t.didyouknowText=t.didyouknow[e].text,t.didyouknowSource=t.didyouknow[e].source,t.showDidyouknow=!0}),5500)}};ut.render=lt;var dt=ut,ft={name:"App",data:function(){return{results:[],activeBooks:[],isFacetsLoading:!0,isSearchLoading:!0}},computed:{isLoading:function(){return!(!this.isFacetsLoading&&!this.isSearchLoading)}},methods:{setResults:function(t){this.results=t},setFacetsLoading:function(t){this.isFacetsLoading=t},setSearchLoading:function(t){this.isSearchLoading=t},setBooks:function(t){this.activeBooks=t}},components:{Search:w,Viz:C,DownloadCSV:et,Facets:X,Loader:dt}};n("a09a");ft.render=h;var bt=ft;Object(o["b"])(bt).mount("#app")},5990:function(t,e,n){},a09a:function(t,e,n){"use strict";n("ca6d")},ca6d:function(t,e,n){},e023:function(t,e,n){"use strict";n("28cf")}});
//# sourceMappingURL=app.afca2832.js.map