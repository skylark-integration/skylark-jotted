define(['../util'], function (util) {
    'use strict';
    return class PluginStylus {
        constructor(jotted, options) {
            var priority = 20;
            options = util.extend(options, {});
            if (typeof window.stylus === 'undefined') {
                return;
            }
            jotted.$container.querySelector('a[data-jotted-type="css"]').innerHTML = 'Stylus';
            jotted.on('change', this.change.bind(this), priority);
        }
        isStylus(params) {
            if (params.type !== 'css') {
                return false;
            }
            return params.file.indexOf('.styl') !== -1 || params.file === '';
        }
        change(params, callback) {
            if (this.isStylus(params)) {
                window.stylus(params.content, this.options).render((err, res) => {
                    if (err) {
                        return callback(err, params);
                    } else {
                        params.content = res;
                    }
                    callback(null, params);
                });
            } else {
                callback(null, params);
            }
        }
    };
});