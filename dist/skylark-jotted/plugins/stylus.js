/**
 * skylark-jotted - A version of jotted( html/css/js playground) that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jotted/
 * @license MIT
 */
define(["../util"],function(t){"use strict";return class{constructor(n,e){e=t.extend(e,{}),void 0!==window.stylus&&(n.$container.querySelector('a[data-jotted-type="css"]').innerHTML="Stylus",n.on("change",this.change.bind(this),20))}isStylus(t){return"css"===t.type&&(-1!==t.file.indexOf(".styl")||""===t.file)}change(t,n){this.isStylus(t)?window.stylus(t.content,this.options).render((e,s)=>{if(e)return n(e,t);t.content=s,n(null,t)}):n(null,t)}}});
//# sourceMappingURL=../sourcemaps/plugins/stylus.js.map
