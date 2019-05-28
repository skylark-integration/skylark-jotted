/**
 * skylark-jotted - A version of jotted( html/css/js playground) that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jotted/
 * @license MIT
 */
define(["../util"],function(t){"use strict";return class{constructor(e,n){if(this.options=t.extend(n,{}),void 0!==window.Babel)this.babel=window.Babel;else{if(void 0===window.babel)return;this.babel={transform:window.babel}}e.$container.querySelector('a[data-jotted-type="js"]').innerHTML="ES2015",e.on("change",this.change.bind(this),20)}change(t,e){if("js"===t.type){try{t.content=this.babel.transform(t.content,this.options).code}catch(n){return e(n,t)}e(null,t)}else e(null,t)}}});
//# sourceMappingURL=../sourcemaps/plugins/babel.js.map
