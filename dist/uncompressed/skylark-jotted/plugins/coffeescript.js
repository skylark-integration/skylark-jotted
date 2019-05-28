define(['../util'], function (util) {
    'use strict';
    return class PluginCoffeeScript {
        constructor(jotted, options) {
            var priority = 20;
            options = util.extend(options, {});
            if (typeof window.CoffeeScript === 'undefined') {
                return;
            }
            jotted.$container.querySelector('a[data-jotted-type="js"]').innerHTML = 'CoffeeScript';
            jotted.on('change', this.change.bind(this), priority);
        }
        isCoffee(params) {
            if (params.type !== 'js') {
                return false;
            }
            return params.file.indexOf('.coffee') !== -1 || params.file === '';
        }
        change(params, callback) {
            if (this.isCoffee(params)) {
                try {
                    params.content = window.CoffeeScript.compile(params.content);
                } catch (err) {
                    return callback(err, params);
                }
            }
            callback(null, params);
        }
    };
});