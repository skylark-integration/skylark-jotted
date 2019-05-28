/**
 * skylark-jotted - A version of jotted( html/css/js playground) that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jotted/
 * @license MIT
 */
define(["../util"],function(t){"use strict";return class{constructor(e,n){var c={};!1===(n=t.extend(n,{firstRun:!0})).firstRun&&(c={html:{type:"html",content:""},css:{type:"css",content:""},js:{type:"js",content:""}});var i=document.createElement("button");i.className="jotted-button jotted-button-play",i.innerHTML="Run",e.$container.appendChild(i),i.addEventListener("click",this.run.bind(this)),e.on("change",this.change.bind(this),10),this.cache=c,this.code={},this.jotted=e}change(e,n){this.code[e.type]=t.extend(e),void 0!==this.cache[e.type]?(n(null,this.cache[e.type]),this.cache[e.type].forceRender=null):(this.cache[e.type]=t.extend(e),n(null,e))}run(){for(let e in this.code)this.cache[e]=t.extend(this.code[e],{forceRender:!0}),this.jotted.trigger("change",this.cache[e])}}});
//# sourceMappingURL=../sourcemaps/plugins/play.js.map
