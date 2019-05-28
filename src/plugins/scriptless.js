define(['../util'], function (util) {
    'use strict';
    return class PluginScriptless {
        constructor(jotted, options) {
            options = util.extend(options, {});
            var runScriptTypes = [
                'application/javascript',
                'application/ecmascript',
                'application/x-ecmascript',
                'application/x-javascript',
                'text/ecmascript',
                'text/javascript',
                'text/javascript1.0',
                'text/javascript1.1',
                'text/javascript1.2',
                'text/javascript1.3',
                'text/javascript1.4',
                'text/javascript1.5',
                'text/jscript',
                'text/livescript',
                'text/x-ecmascript',
                'text/x-javascript'
            ];
            jotted.on('change', this.change.bind(this));
            this.runScriptTypes = runScriptTypes;
        }
        change(params, callback) {
            if (params.type !== 'html') {
                return callback(null, params);
            }
            var fragment = document.createElement('div');
            fragment.innerHTML = params.content;
            var typeAttr = null;
            var $scripts = fragment.querySelectorAll('script');
            for (let i = 0; i < $scripts.length; i++) {
                typeAttr = $scripts[i].getAttribute('type');
                if (!typeAttr || this.runScriptTypes.indexOf(typeAttr) !== -1) {
                    $scripts[i].parentNode.removeChild($scripts[i]);
                }
            }
            params.content = fragment.innerHTML;
            callback(null, params);
        }
    };
});