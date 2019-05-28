/**
 * skylark-jotted - A version of jotted( html/css/js playground) that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jotted/
 * @license MIT
 */
define(["../util"],function(e){"use strict";return class{constructor(t,i){var o;if(this.editor={},this.jotted=t,i=e.extend(i,{}),void 0!==window.ace){var n=t.$container.querySelectorAll(".jotted-editor");for(o=0;o<n.length;o++){let t=n[o].querySelector("textarea"),d=e.data(t,"jotted-type"),r=e.data(t,"jotted-file"),a=document.createElement("div");n[o].appendChild(a),this.editor[d]=window.ace.edit(a);let c=this.editor[d],s=e.extend(i);c.getSession().setMode("ace/mode/"+e.getMode(d,r)),c.getSession().setOptions(s),c.$blockScrolling=1/0}t.on("change",this.change.bind(this),1)}}editorChange(e){return()=>{this.jotted.trigger("change",e)}}change(e,t){var i=this.editor[e.type];e.aceEditor||(i.getSession().setValue(e.content),e.aceEditor=i,i.on("change",this.editorChange(e))),e.content=i.getValue(),t(null,e)}}});
//# sourceMappingURL=../sourcemaps/plugins/ace.js.map
