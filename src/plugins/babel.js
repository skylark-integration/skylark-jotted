define(['../util'], function (util) {
    'use strict';
    return class PluginBabel {
        constructor(jotted, options) {
            var priority = 20;
            this.options = util.extend(options, {});
            if (typeof window.Babel !== 'undefined') {
                this.babel = window.Babel;
            } else if (typeof window.babel !== 'undefined') {
                this.babel = { transform: window.babel };
            } else {
                return;
            }
            jotted.$container.querySelector('a[data-jotted-type="js"]').innerHTML = 'ES2015';
            jotted.on('change', this.change.bind(this), priority);
        }
        change(params, callback) {
            if (params.type === 'js') {
                try {
                    params.content = this.babel.transform(params.content, this.options).code;
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