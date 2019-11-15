define([
    'skylark-ace',
    '../util'
], function (ace,util) {
    'use strict';
    return class PluginAce {
        constructor(jotted, options) {
            var priority = 1;
            var i;
            this.editor = {};
            this.jotted = jotted;
            options = util.extend(options, {});
            //if (typeof window.ace === 'undefined') {
            //    return;
            // }
            var $editors = jotted.$container.querySelectorAll('.jotted-editor');
            for (i = 0; i < $editors.length; i++) {
                let $textarea = $editors[i].querySelector('textarea');
                let type = util.data($textarea, 'jotted-type');
                let file = util.data($textarea, 'jotted-file');
                let $aceContainer = document.createElement('div');
                $editors[i].appendChild($aceContainer);
                this.editor[type] = ace.edit($aceContainer);
                let editor = this.editor[type];
                let editorOptions = util.extend(options);
                editor.getSession().setMode('ace/mode/' + util.getMode(type, file));
                editor.getSession().setOptions(editorOptions);
                editor.$blockScrolling = Infinity;
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
            if (!params.aceEditor) {
                editor.getSession().setValue(params.content);
                params.aceEditor = editor;
                editor.on('change', this.editorChange(params));
            }
            params.content = editor.getValue();
            callback(null, params);
        }
    };
});