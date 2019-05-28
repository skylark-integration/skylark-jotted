/**
 * skylark-jotted - A version of jotted( html/css/js playground) that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jotted/
 * @license MIT
 */
define(["../util"],function(t){"use strict";return class{constructor(e,i){i=t.extend(i,{});e.on("change",this.change.bind(this)),this.runScriptTypes=["application/javascript","application/ecmascript","application/x-ecmascript","application/x-javascript","text/ecmascript","text/javascript","text/javascript1.0","text/javascript1.1","text/javascript1.2","text/javascript1.3","text/javascript1.4","text/javascript1.5","text/jscript","text/livescript","text/x-ecmascript","text/x-javascript"]}change(t,e){if("html"!==t.type)return e(null,t);var i=document.createElement("div");i.innerHTML=t.content;var a=null,c=i.querySelectorAll("script");for(let t=0;t<c.length;t++)(a=c[t].getAttribute("type"))&&-1===this.runScriptTypes.indexOf(a)||c[t].parentNode.removeChild(c[t]);t.content=i.innerHTML,e(null,t)}}});
//# sourceMappingURL=../sourcemaps/plugins/scriptless.js.map
