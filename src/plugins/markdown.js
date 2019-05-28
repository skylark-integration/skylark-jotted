define(['../util'], function (util) {
    'use strict';
    return class PluginMarkdown {
        constructor(jotted, options) {
            var priority = 20;
            this.options = util.extend(options, {});
            if (typeof window.marked === 'undefined') {
                return;
            }
            window.marked.setOptions(options);
            jotted.$container.querySelector('a[data-jotted-type="html"]').innerHTML = 'Markdown';
            jotted.on('change', this.change.bind(this), priority);
        }
        change(params, callback) {
            if (params.type === 'html') {
                try {
                    params.content = window.marked(params.content);
                } catch (err) {
                    return callback(err, params);
                }
                callback(null, params);
            } else {
                callback(null, params);
            }
        }
    };
});