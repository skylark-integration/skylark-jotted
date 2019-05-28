/**
 * skylark-jotted - A version of jotted( html/css/js playground) that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jotted/
 * @license MIT
 */
define(["../util"],function(t){"use strict";return class{constructor(e,r){var o;this.editor={},this.jotted=e;var i={html:"htmlmixed"};if(r=t.extend(r,{lineNumbers:!0}),void 0!==window.CodeMirror){var n=e.$container.querySelectorAll(".jotted-editor");for(o=0;o<n.length;o++){let e=n[o].querySelector("textarea"),d=t.data(e,"jotted-type"),a=t.data(e,"jotted-file");this.editor[d]=window.CodeMirror.fromTextArea(e,r),this.editor[d].setOption("mode",t.getMode(d,a,i))}e.on("change",this.change.bind(this),1)}}editorChange(t){return()=>{this.jotted.trigger("change",t)}}change(t,e){var r=this.editor[t.type];t.cmEditor||(r.setValue(t.content),t.cmEditor=r,r.on("change",this.editorChange(t))),t.content=r.getValue(),e(null,t)}}});
//# sourceMappingURL=../sourcemaps/plugins/codemirror.js.map
