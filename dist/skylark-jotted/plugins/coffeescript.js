/**
 * skylark-jotted - A version of jotted( html/css/js playground) that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jotted/
 * @license MIT
 */
define(["../util"],function(e){"use strict";return class{constructor(t,n){n=e.extend(n,{}),void 0!==window.CoffeeScript&&(t.$container.querySelector('a[data-jotted-type="js"]').innerHTML="CoffeeScript",t.on("change",this.change.bind(this),20))}isCoffee(e){return"js"===e.type&&(-1!==e.file.indexOf(".coffee")||""===e.file)}change(e,t){if(this.isCoffee(e))try{e.content=window.CoffeeScript.compile(e.content)}catch(n){return t(n,e)}t(null,e)}}});
//# sourceMappingURL=../sourcemaps/plugins/coffeescript.js.map
