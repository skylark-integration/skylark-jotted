/**
 * skylark-jotted - A version of jotted( html/css/js playground) that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jotted/
 * @license MIT
 */
define(["skylark-net-http/Xhr"],function(e){"use strict";function n(e={},n={}){var t={};return Object.keys(e).forEach(function(n){t[n]=e[n]}),Object.keys(n).forEach(function(s){void 0!==t[s]?t[s]=e[s]:t[s]=n[s]}),t}function t(e,n,s,a,c){s[e](n,function(e,n,s,a,c){return function(n,l){n&&a.push(n),++e<s.length?t(e,l,s,a,c):c(a,l)}}.apply(this,arguments))}function s(e,n){return!!e.className&&(n=" "+n+" ",-1!==(" "+e.className+" ").indexOf(n))}var a={html:"html",css:"css",js:"javascript",less:"less",styl:"stylus",coffee:"coffeescript"};return{extend:n,fetch:function(n,t){e.get(n).then(function(e){t(null,e)},function(e){t(e)})},seq:function(e,n,s=function(){}){var a=[];if(!e.length)return s(a,n);t(0,n,e,a,s)},debounce:function(e,n){var t=null,s=null;return function(){t?s=!0:e.apply(this,arguments),clearTimeout(t),t=setTimeout(()=>{s&&e.apply(this,arguments),t=null,s=null},n)}},log:function(){console.log(arguments)},getMode:function(e="",t="",s={}){var c=n(s,a);for(let e in c){let n=e.length;if(t.slice(-n++)==="."+e)return c[e]}for(let n in c)if(e===n)return c[n];return e},data:function(e,n){return e.getAttribute("data-"+n)},hasClass:s,addClass:function(e,n){return s(e,n)?e.className:(e.className&&(n=" "+n),e.className+=n,e.className)},removeClass:function(e,n){var t=" "+n,s=n+" ";return-1!==e.className.indexOf(t)?e.className=e.className.replace(t,""):-1!==e.className.indexOf(s)?e.className=e.className.replace(s,""):e.className=e.className.replace(n,""),e.className}}});
//# sourceMappingURL=sourcemaps/util.js.map
