/**
 * skylark-jotted - A version of jotted( html/css/js playground) that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jotted/
 * @license MIT
 */
define(["../util"],function(t){"use strict";return class{constructor(n,e){this.options=t.extend(e,{}),void 0!==window.marked&&(window.marked.setOptions(e),n.$container.querySelector('a[data-jotted-type="html"]').innerHTML="Markdown",n.on("change",this.change.bind(this),20))}change(t,n){if("html"===t.type){try{t.content=window.marked(t.content)}catch(e){return n(e,t)}n(null,t)}else n(null,t)}}});
//# sourceMappingURL=../sourcemaps/plugins/markdown.js.map
