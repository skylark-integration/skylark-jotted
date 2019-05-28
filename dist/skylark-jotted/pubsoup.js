/**
 * skylark-jotted - A version of jotted( html/css/js playground) that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jotted/
 * @license MIT
 */
define(["./util"],function(s){"use strict";return class{constructor(){this.topics={},this.callbacks={}}find(s){return this.topics[s]=this.topics[s]||[],this.topics[s]}subscribe(s,i,t=90){var c=this.find(s);i._priority=t,c.push(i),c.sort(function(s,i){return s._priority>i._priority?1:i._priority>s._priority?-1:0})}remover(s,i){s.forEach(function(){if(i){var t=[].indexOf.call(s,i);-1!==t&&s.splice(t,1)}else s.length=0})}unsubscribe(s,i){var t=this.find(s);this.remover(t,i),this.callbacks[s]=this.callbacks[s]||[],this.remover(this.callbacks[s],i)}publish(i,t={}){var c=[];this.find(i).forEach(function(s){c.push(s)}),s.seq(c,t,this.runCallbacks(i))}runCallbacks(s){return(i,t)=>{this.callbacks[s]=this.callbacks[s]||[],this.callbacks[s].forEach(s=>{s(i,t)})}}done(s,i=function(){}){this.callbacks[s]=this.callbacks[s]||[],this.callbacks[s].push(i)}}});
//# sourceMappingURL=sourcemaps/pubsoup.js.map
