/**
 * skylark-jotted - A version of jotted( html/css/js playground) that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jotted/
 * @license MIT
 */
define(["skylark-codemirror/CodeMirror","../util"],function(t,e){"use strict";return class{constructor(r,o){var i;this.editor={},this.jotted=r;var n={html:"htmlmixed"};o=e.extend(o,{lineNumbers:!0});var d=r.$container.querySelectorAll(".jotted-editor");for(i=0;i<d.length;i++){let r=d[i].querySelector("textarea"),a=e.data(r,"jotted-type"),h=e.data(r,"jotted-file");this.editor[a]=t.fromTextArea(r,o),this.editor[a].setOption("mode",e.getMode(a,h,n))}r.on("change",this.change.bind(this),1)}editorChange(t){return()=>{this.jotted.trigger("change",t)}}change(t,e){var r=this.editor[t.type];t.cmEditor||(r.setValue(t.content),t.cmEditor=r,r.on("change",this.editorChange(t))),t.content=r.getValue(),e(null,t)}}});
//# sourceMappingURL=../sourcemaps/plugins/codemirror.js.map
