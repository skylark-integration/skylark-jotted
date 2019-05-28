/**
 * skylark-jotted - A version of jotted( html/css/js playground) that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jotted/
 * @license MIT
 */
define(["../util"],function(e){"use strict";return class{constructor(s,n){n=e.extend(n,{}),void 0!==window.less&&(s.$container.querySelector('a[data-jotted-type="css"]').innerHTML="Less",s.on("change",this.change.bind(this),20))}isLess(e){return"css"===e.type&&(-1!==e.file.indexOf(".less")||""===e.file)}change(e,s){this.isLess(e)?window.less.render(e.content,this.options,(n,t)=>{if(n)return s(n,e);e.content=t.css,s(null,e)}):s(null,e)}}});
//# sourceMappingURL=../sourcemaps/plugins/less.js.map
