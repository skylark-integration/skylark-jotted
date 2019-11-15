/**
 * skylark-jotted - A version of jotted( html/css/js playground) that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jotted/
 * @license MIT
 */
define(["skylark-ace","../util"],function(e,t){"use strict";return class{constructor(o,i){var n;this.editor={},this.jotted=o,i=t.extend(i,{});var r=o.$container.querySelectorAll(".jotted-editor");for(n=0;n<r.length;n++){let o=r[n].querySelector("textarea"),d=t.data(o,"jotted-type"),a=t.data(o,"jotted-file"),s=document.createElement("div");r[n].appendChild(s),this.editor[d]=e.edit(s);let c=this.editor[d],l=t.extend(i);c.getSession().setMode("ace/mode/"+t.getMode(d,a)),c.getSession().setOptions(l),c.$blockScrolling=1/0}o.on("change",this.change.bind(this),1)}editorChange(e){return()=>{this.jotted.trigger("change",e)}}change(e,t){var o=this.editor[e.type];e.aceEditor||(o.getSession().setValue(e.content),e.aceEditor=o,o.on("change",this.editorChange(e))),e.content=o.getValue(),t(null,e)}}});
//# sourceMappingURL=../sourcemaps/plugins/ace.js.map
