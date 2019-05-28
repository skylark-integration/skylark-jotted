/**
 * skylark-jotted - A version of jotted( html/css/js playground) that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jotted/
 * @license MIT
 */
define(["../util"],function(t){"use strict";return class{constructor(e,n){n=t.extend(n,{});var s=!!("srcdoc"in document.createElement("iframe")),r=e.$container.querySelector(".jotted-pane-result iframe");window.addEventListener("message",this.domready.bind(this)),e.on("change",this.change.bind(this),100),this.supportSrcdoc=s,this.content={html:"",css:"",js:""},this.frameContent="",this.$resultFrame=r,this.callbacks=[],this.index=0,this.lastCallback=(()=>{})}template(t="",e="",n=""){return`\n      <!doctype html>\n      <html>\n        <head>\n          <script>\n            (function () {\n              window.addEventListener('DOMContentLoaded', function () {\n                window.parent.postMessage(JSON.stringify({\n                  type: 'jotted-dom-ready'\n                }), '*')\n              })\n            }())\n          <\/script>\n\n          <style>${t}</style>\n        </head>\n        <body>\n          ${e}\n\n          \x3c!--\n            Jotted:\n            Empty script tag prevents malformed HTML from breaking the next script.\n          --\x3e\n          <script><\/script>\n          <script>${n}<\/script>\n        </body>\n      </html>\n    `}change(t,e){this.content[t.type]=t.content;var n=this.frameContent;if(this.frameContent=this.template(this.content.css,this.content.html,this.content.js),this.lastCallback=(()=>{this.lastCallback=(()=>{}),e(null,t)}),!0===t.forceRender||this.frameContent!==n)if(this.supportSrcdoc){var s=document.createElement("iframe");this.$resultFrame.parentNode.replaceChild(s,this.$resultFrame),this.$resultFrame=s,this.$resultFrame.contentWindow.document.open(),this.$resultFrame.contentWindow.document.write(this.frameContent),this.$resultFrame.contentWindow.document.close()}else{this.$resultFrame.setAttribute("data-srcdoc",this.frameContent);var r='javascript:window.frameElement.getAttribute("data-srcdoc");';this.$resultFrame.setAttribute("src",r),this.$resultFrame.contentWindow&&(this.$resultFrame.contentWindow.location=r)}else e(null,t)}domready(t){if(t.source===this.$resultFrame.contentWindow){var e={};try{e=JSON.parse(t.data)}catch(t){}"jotted-dom-ready"===e.type&&this.lastCallback()}}}});
//# sourceMappingURL=../sourcemaps/plugins/render.js.map
