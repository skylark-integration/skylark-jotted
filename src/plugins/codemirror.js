define([
    'skylark-codemirror',
    '../util'
], function (CodeMirror,util) {
    'use strict';
    return class PluginCodeMirror {
        constructor(jotted, options) {
            var priority = 1;
            var i;
            this.editor = {};
            this.jotted = jotted;
            var modemap = { 'html': 'htmlmixed' };
            options = util.extend(options, { lineNumbers: true });
            //if (typeof window.CodeMirror === 'undefined') {
            //    return;
            //}
            var $editors = jotted.$container.querySelectorAll('.jotted-editor');
            for (i = 0; i < $editors.length; i++) {
                let $textarea = $editors[i].querySelector('textarea');
                let type = util.data($textarea, 'jotted-type');
                let file = util.data($textarea, 'jotted-file');
                this.editor[type] = CodeMirror.fromTextArea($textarea, options);
                this.editor[type].setOption('mode', util.getMode(type, file, modemap));
            }
            jotted.on('change', this.change.bind(this), priority);
        }
        editorChange(params) {
            return () => {
                this.jotted.trigger('change', params);
            };
        }
        change(params, callback) {
            var editor = this.editor[params.type];
            if (!params.cmEditor) {
                editor.setValue(params.content);
                params.cmEditor = editor;
                editor.on('change', this.editorChange(params));
            }
            params.content = editor.getValue();
            callback(null, params);
        }
    };
});