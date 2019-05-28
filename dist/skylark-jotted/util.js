/**
 * skylark-jotted - A version of jotted( html/css/js playground) that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jotted/
 * @license MIT
 */
define(function(){"use strict";function e(e={},n={}){var s={};return Object.keys(e).forEach(function(n){s[n]=e[n]}),Object.keys(n).forEach(function(t){void 0!==s[t]?s[t]=e[t]:s[t]=n[t]}),s}function n(e,s,t,a,c){t[e](s,function(e,s,t,a,c){return function(s,l){s&&a.push(s),++e<t.length?n(e,l,t,a,c):c(a,l)}}.apply(this,arguments))}function s(e,n){return!!e.className&&(n=" "+n+" ",-1!==(" "+e.className+" ").indexOf(n))}var t={html:"html",css:"css",js:"javascript",less:"less",styl:"stylus",coffee:"coffeescript"};return{extend:e,fetch:function(e,n){var s=new window.XMLHttpRequest;s.open("GET",e),s.responseType="text",s.onload=function(){200===s.status?n(null,s.responseText):n(e,s)},s.onerror=function(e){n(e)},s.send()},seq:function(e,s,t=function(){}){var a=[];if(!e.length)return t(a,s);n(0,s,e,a,t)},debounce:function(e,n){var s=null,t=null;return function(){s?t=!0:e.apply(this,arguments),clearTimeout(s),s=setTimeout(()=>{t&&e.apply(this,arguments),s=null,t=null},n)}},log:function(){console.log(arguments)},getMode:function(n="",s="",a={}){var c=e(a,t);for(let e in c){let n=e.length;if(s.slice(-n++)==="."+e)return c[e]}for(let e in c)if(n===e)return c[e];return n},data:function(e,n){return e.getAttribute("data-"+n)},hasClass:s,addClass:function(e,n){return s(e,n)?e.className:(e.className&&(n=" "+n),e.className+=n,e.className)},removeClass:function(e,n){var s=" "+n,t=n+" ";return-1!==e.className.indexOf(s)?e.className=e.className.replace(s,""):-1!==e.className.indexOf(t)?e.className=e.className.replace(t,""):e.className=e.className.replace(n,""),e.className}}});
//# sourceMappingURL=sourcemaps/util.js.map
