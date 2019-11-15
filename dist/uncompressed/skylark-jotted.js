/**
 * skylark-jotted - A version of jotted( html/css/js playground) that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jotted/
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx/skylark");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-jotted/util',[
    "skylark-net-http/Xhr"
],function (Xhr) {
    'use strict';
    function extend(obj = {}, defaults = {}) {
        var extended = {};
        Object.keys(obj).forEach(function (key) {
            extended[key] = obj[key];
        });
        Object.keys(defaults).forEach(function (key) {
            if (typeof extended[key] !== 'undefined') {
                extended[key] = obj[key];
            } else {
                extended[key] = defaults[key];
            }
        });
        return extended;
    }
    function fetch(url, callback) {
        /*
        var xhr = new window.XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'text';
        xhr.onload = function () {
            if (xhr.status === 200) {
                callback(null, xhr.responseText);
            } else {
                callback(url, xhr);
            }
        };
        xhr.onerror = function (err) {
            callback(err);
        };
        xhr.send();
        */
        Xhr.get(url).then(
            function(res) {
                callback(null,res);
            },
            function(e){
                callback(e);
            }
        )
    }
    function runCallback(index, params, arr, errors, callback) {
        return function (err, res) {
            if (err) {
                errors.push(err);
            }
            index++;
            if (index < arr.length) {
                seqRunner(index, res, arr, errors, callback);
            } else {
                callback(errors, res);
            }
        };
    }
    function seqRunner(index, params, arr, errors, callback) {
        arr[index](params, runCallback.apply(this, arguments));
    }
    function seq(arr, params, callback = function () {
    }) {
        var errors = [];
        if (!arr.length) {
            return callback(errors, params);
        }
        seqRunner(0, params, arr, errors, callback);
    }
    function debounce(fn, delay) {
        var cooldown = null;
        var multiple = null;
        return function () {
            if (cooldown) {
                multiple = true;
            } else {
                fn.apply(this, arguments);
            }
            clearTimeout(cooldown);
            cooldown = setTimeout(() => {
                if (multiple) {
                    fn.apply(this, arguments);
                }
                cooldown = null;
                multiple = null;
            }, delay);
        };
    }
    function log() {
        console.log(arguments);
    }
    function hasClass(node, className) {
        if (!node.className) {
            return false;
        }
        var tempClass = ' ' + node.className + ' ';
        className = ' ' + className + ' ';
        if (tempClass.indexOf(className) !== -1) {
            return true;
        }
        return false;
    }
    function addClass(node, className) {
        if (hasClass(node, className)) {
            return node.className;
        }
        if (node.className) {
            className = ' ' + className;
        }
        node.className += className;
        return node.className;
    }
    function removeClass(node, className) {
        var spaceBefore = ' ' + className;
        var spaceAfter = className + ' ';
        if (node.className.indexOf(spaceBefore) !== -1) {
            node.className = node.className.replace(spaceBefore, '');
        } else if (node.className.indexOf(spaceAfter) !== -1) {
            node.className = node.className.replace(spaceAfter, '');
        } else {
            node.className = node.className.replace(className, '');
        }
        return node.className;
    }
    function data(node, attr) {
        return node.getAttribute('data-' + attr);
    }
    var defaultModemap = {
        'html': 'html',
        'css': 'css',
        'js': 'javascript',
        'less': 'less',
        'styl': 'stylus',
        'coffee': 'coffeescript'
    };
    function getMode(type = '', file = '', customModemap = {}) {
        var modemap = extend(customModemap, defaultModemap);
        for (let key in modemap) {
            let keyLength = key.length;
            if (file.slice(-keyLength++) === '.' + key) {
                return modemap[key];
            }
        }
        for (let key in modemap) {
            if (type === key) {
                return modemap[key];
            }
        }
        return type;
    }
    return {
        extend,
        fetch,
        seq,
        debounce,
        log,
        getMode,
        data,
        hasClass,
        addClass,
        removeClass
    };
});
define('skylark-jotted/template',[],function () {
    'use strict';
    function container() {
        return `
    <ul class="jotted-nav">
      <li class="jotted-nav-item jotted-nav-item-result">
        <a href="#" data-jotted-type="result">
          Result
        </a>
      </li>
      <li class="jotted-nav-item jotted-nav-item-html">
        <a href="#" data-jotted-type="html">
          HTML
        </a>
      </li>
      <li class="jotted-nav-item jotted-nav-item-css">
        <a href="#" data-jotted-type="css">
          CSS
        </a>
      </li>
      <li class="jotted-nav-item jotted-nav-item-js">
        <a href="#" data-jotted-type="js">
          JavaScript
        </a>
      </li>
    </ul>
    <div class="jotted-pane jotted-pane-result"><iframe></iframe></div>
    <div class="jotted-pane jotted-pane-html"></div>
    <div class="jotted-pane jotted-pane-css"></div>
    <div class="jotted-pane jotted-pane-js"></div>
  `;
    }
    function paneActiveClass(type) {
        return `jotted-pane-active-${ type }`;
    }
    function containerClass() {
        return 'jotted';
    }
    function hasFileClass(type) {
        return `jotted-has-${ type }`;
    }
    function editorClass(type) {
        return `jotted-editor jotted-editor-${ type }`;
    }
    function editorContent(type, fileUrl = '') {
        return `
    <textarea data-jotted-type="${ type }" data-jotted-file="${ fileUrl }"></textarea>
    <div class="jotted-status"></div>
  `;
    }
    function statusMessage(err) {
        return `
    <p>${ err }</p>
  `;
    }
    function statusClass(type) {
        return `jotted-status-${ type }`;
    }
    function statusActiveClass(type) {
        return `jotted-status-active-${ type }`;
    }
    function pluginClass(name) {
        return `jotted-plugin-${ name }`;
    }
    function statusLoading(url) {
        return `Loading <strong>${ url }</strong>..`;
    }
    function statusFetchError(url) {
        return `There was an error loading <strong>${ url }</strong>.`;
    }
    return {
        container: container,
        paneActiveClass: paneActiveClass,
        containerClass: containerClass,
        hasFileClass: hasFileClass,
        editorClass: editorClass,
        editorContent: editorContent,
        statusMessage: statusMessage,
        statusClass: statusClass,
        statusActiveClass: statusActiveClass,
        pluginClass: pluginClass,
        statusLoading: statusLoading,
        statusFetchError: statusFetchError
    };
});
define('skylark-jotted/plugin',[
    './util',
    './template'
], function (util, template) {
    'use strict';
    var plugins = [];
    function find(id) {
        for (let pluginIndex in plugins) {
            let plugin = plugins[pluginIndex];
            if (plugin._id === id) {
                return plugin;
            }
        }
        throw new Error(`Plugin ${ id } is not registered.`);
    }
    function register(id, plugin) {
        plugin._id = id;
        plugins.push(plugin);
    }
    function init() {
        this._get('options').plugins.forEach(plugin => {
            let Plugin;
            let pluginName;
            let pluginOptions = {};
            if (typeof plugin === 'string') {
                pluginName = plugin;
            } else if (typeof plugin === 'object') {
                pluginName = plugin.name;
                pluginOptions = plugin.options || {};
            }
            Plugin = find(pluginName);
            this._get('plugins')[plugin] = new Plugin(this, pluginOptions);
            util.addClass(this._get('$container'), template.pluginClass(pluginName));
        });
    }
    return {
        register,
        init
    };
});
define('skylark-jotted/pubsoup',['./util'], function (util) {
    'use strict';
    return class PubSoup {
        constructor() {
            this.topics = {};
            this.callbacks = {};
        }
        find(query) {
            this.topics[query] = this.topics[query] || [];
            return this.topics[query];
        }
        subscribe(topic, subscriber, priority = 90) {
            var foundTopic = this.find(topic);
            subscriber._priority = priority;
            foundTopic.push(subscriber);
            foundTopic.sort(function (a, b) {
                return a._priority > b._priority ? 1 : b._priority > a._priority ? -1 : 0;
            });
        }
        remover(arr, fn) {
            arr.forEach(function () {
                if (!fn) {
                    arr.length = 0;
                    return;
                }
                var index = [].indexOf.call(arr, fn);
                if (index === -1) {
                    return;
                }
                arr.splice(index, 1);
            });
        }
        unsubscribe(topic, subscriber) {
            var foundTopic = this.find(topic);
            this.remover(foundTopic, subscriber);
            this.callbacks[topic] = this.callbacks[topic] || [];
            this.remover(this.callbacks[topic], subscriber);
        }
        publish(topic, params = {}) {
            var foundTopic = this.find(topic);
            var runList = [];
            foundTopic.forEach(function (subscriber) {
                runList.push(subscriber);
            });
            util.seq(runList, params, this.runCallbacks(topic));
        }
        runCallbacks(topic) {
            return (err, params) => {
                this.callbacks[topic] = this.callbacks[topic] || [];
                this.callbacks[topic].forEach(c => {
                    c(err, params);
                });
            };
        }
        done(topic, callback = function () {
        }) {
            this.callbacks[topic] = this.callbacks[topic] || [];
            this.callbacks[topic].push(callback);
        }
    };
});
define('skylark-jotted/plugins/render',['../util'], function (util) {
    'use strict';
    return class PluginRender {
        constructor(jotted, options) {
            options = util.extend(options, {});
            var supportSrcdoc = !!('srcdoc' in document.createElement('iframe'));
            var $resultFrame = jotted.$container.querySelector('.jotted-pane-result iframe');
            var frameContent = '';
            var content = {
                html: '',
                css: '',
                js: ''
            };
            window.addEventListener('message', this.domready.bind(this));
            jotted.on('change', this.change.bind(this), 100);
            this.supportSrcdoc = supportSrcdoc;
            this.content = content;
            this.frameContent = frameContent;
            this.$resultFrame = $resultFrame;
            this.callbacks = [];
            this.index = 0;
            this.lastCallback = () => {
            };
        }
        template(style = '', body = '', script = '') {
            return `
      <!doctype html>
      <html>
        <head>
          <script>
            (function () {
              window.addEventListener('DOMContentLoaded', function () {
                window.parent.postMessage(JSON.stringify({
                  type: 'jotted-dom-ready'
                }), '*')
              })
            }())
          </script>

          <style>${ style }</style>
        </head>
        <body>
          ${ body }

          <!--
            Jotted:
            Empty script tag prevents malformed HTML from breaking the next script.
          -->
          <script></script>
          <script>${ script }</script>
        </body>
      </html>
    `;
        }
        change(params, callback) {
            this.content[params.type] = params.content;
            var oldFrameContent = this.frameContent;
            this.frameContent = this.template(this.content['css'], this.content['html'], this.content['js']);
            this.lastCallback = () => {
                this.lastCallback = () => {
                };
                callback(null, params);
            };
            if (params.forceRender !== true && this.frameContent === oldFrameContent) {
                callback(null, params);
                return;
            }
            if (this.supportSrcdoc) {
                var $newResultFrame = document.createElement('iframe');
                this.$resultFrame.parentNode.replaceChild($newResultFrame, this.$resultFrame);
                this.$resultFrame = $newResultFrame;
                this.$resultFrame.contentWindow.document.open();
                this.$resultFrame.contentWindow.document.write(this.frameContent);
                this.$resultFrame.contentWindow.document.close();
            } else {
                this.$resultFrame.setAttribute('data-srcdoc', this.frameContent);
                var jsUrl = 'javascript:window.frameElement.getAttribute("data-srcdoc");';
                this.$resultFrame.setAttribute('src', jsUrl);
                if (this.$resultFrame.contentWindow) {
                    this.$resultFrame.contentWindow.location = jsUrl;
                }
            }
        }
        domready(e) {
            if (e.source !== this.$resultFrame.contentWindow) {
                return;
            }
            var data = {};
            try {
                data = JSON.parse(e.data);
            } catch (e) {
            }
            if (data.type === 'jotted-dom-ready') {
                this.lastCallback();
            }
        }
    };
});
define('skylark-jotted/plugins/scriptless',['../util'], function (util) {
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
define('skylark-jotted/plugins/ace',[
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
define('skylark-jotted/plugins/codemirror',[
    'skylark-codemirror/CodeMirror',
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
define('skylark-jotted/plugins/less',['../util'], function (util) {
    'use strict';
    return class PluginLess {
        constructor(jotted, options) {
            var priority = 20;
            options = util.extend(options, {});
            if (typeof window.less === 'undefined') {
                return;
            }
            jotted.$container.querySelector('a[data-jotted-type="css"]').innerHTML = 'Less';
            jotted.on('change', this.change.bind(this), priority);
        }
        isLess(params) {
            if (params.type !== 'css') {
                return false;
            }
            return params.file.indexOf('.less') !== -1 || params.file === '';
        }
        change(params, callback) {
            if (this.isLess(params)) {
                window.less.render(params.content, this.options, (err, res) => {
                    if (err) {
                        return callback(err, params);
                    } else {
                        params.content = res.css;
                    }
                    callback(null, params);
                });
            } else {
                callback(null, params);
            }
        }
    };
});
define('skylark-jotted/plugins/coffeescript',['../util'], function (util) {
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
define('skylark-jotted/plugins/stylus',['../util'], function (util) {
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
define('skylark-jotted/plugins/babel',['../util'], function (util) {
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
define('skylark-jotted/plugins/markdown',['../util'], function (util) {
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
define('skylark-jotted/plugins/console',['../util'], function (util) {
    'use strict';
    return class PluginConsole {
        constructor(jotted, options) {
            options = util.extend(options, { autoClear: false });
            var priority = 30;
            var history = [];
            var historyIndex = 0;
            var logCaptureSnippet = `(function ${ this.capture.toString() })();`;
            var contentCache = {
                html: '',
                css: '',
                js: ''
            };
            var $nav = document.createElement('li');
            util.addClass($nav, 'jotted-nav-item jotted-nav-item-console');
            $nav.innerHTML = '<a href="#" data-jotted-type="console">JS Console</a>';
            var $pane = document.createElement('div');
            util.addClass($pane, 'jotted-pane jotted-pane-console');
            $pane.innerHTML = `
      <div class="jotted-console-container">
        <ul class="jotted-console-output"></ul>
        <form class="jotted-console-input">
          <input type="text">
        </form>
      </div>
      <button class="jotted-button jotted-console-clear">Clear</button>
    `;
            jotted.$container.appendChild($pane);
            jotted.$container.querySelector('.jotted-nav').appendChild($nav);
            var $container = jotted.$container.querySelector('.jotted-console-container');
            var $output = jotted.$container.querySelector('.jotted-console-output');
            var $input = jotted.$container.querySelector('.jotted-console-input input');
            var $inputForm = jotted.$container.querySelector('.jotted-console-input');
            var $clear = jotted.$container.querySelector('.jotted-console-clear');
            $inputForm.addEventListener('submit', this.submit.bind(this));
            $input.addEventListener('keydown', this.history.bind(this));
            $clear.addEventListener('click', this.clear.bind(this));
            if (options.autoClear === true) {
                jotted.on('change', this.autoClear.bind(this), priority - 1);
            }
            jotted.on('change', this.change.bind(this), priority);
            window.addEventListener('message', this.getMessage.bind(this));
            this.$jottedContainer = jotted.$container;
            this.$container = $container;
            this.$input = $input;
            this.$output = $output;
            this.history = history;
            this.historyIndex = historyIndex;
            this.logCaptureSnippet = logCaptureSnippet;
            this.contentCache = contentCache;
            this.getIframe = this.getIframe.bind(this);
        }
        getIframe() {
            return this.$jottedContainer.querySelector('.jotted-pane-result iframe');
        }
        getMessage(e) {
            if (e.source !== this.getIframe().contentWindow) {
                return;
            }
            var data = {};
            try {
                data = JSON.parse(e.data);
            } catch (err) {
            }
            if (data.type === 'jotted-console-log') {
                this.log(data.message);
            }
        }
        autoClear(params, callback) {
            var snippetlessContent = params.content;
            if (params.type === 'js') {
                snippetlessContent = snippetlessContent.replace(this.logCaptureSnippet, '');
            }
            if (params.forceRender === true || this.contentCache[params.type] !== snippetlessContent) {
                this.clear();
            }
            this.contentCache[params.type] = snippetlessContent;
            callback(null, params);
        }
        change(params, callback) {
            if (params.type !== 'js') {
                return callback(null, params);
            }
            if (params.content.indexOf(this.logCaptureSnippet) === -1) {
                params.content = `${ this.logCaptureSnippet }${ params.content }`;
            }
            callback(null, params);
        }
        capture() {
            if (typeof window.console === 'undefined' || typeof window.console.log === 'undefined') {
                window.console = {
                    log: function () {
                    }
                };
            }
            var oldConsoleLog = Function.prototype.bind.call(window.console.log, window.console);
            window.console.log = function () {
                [].slice.call(arguments).forEach(function (message) {
                    window.parent.postMessage(JSON.stringify({
                        type: 'jotted-console-log',
                        message: message
                    }), '*');
                });
                oldConsoleLog.apply(oldConsoleLog, arguments);
            };
        }
        log(message = '', type) {
            var $log = document.createElement('li');
            util.addClass($log, 'jotted-console-log');
            if (typeof type !== 'undefined') {
                util.addClass($log, `jotted-console-log-${ type }`);
            }
            $log.innerHTML = message;
            this.$output.appendChild($log);
        }
        submit(e) {
            var inputValue = this.$input.value.trim();
            if (inputValue === '') {
                return e.preventDefault();
            }
            this.history.push(inputValue);
            this.historyIndex = this.history.length;
            this.log(inputValue, 'history');
            if (inputValue.indexOf('return') !== 0) {
                inputValue = 'return ' + inputValue;
            }
            try {
                var scriptOutput = this.getIframe().contentWindow.eval(`(function() {${ inputValue }})()`);
                this.log(scriptOutput);
            } catch (err) {
                this.log(err, 'error');
            }
            this.$input.value = '';
            this.$container.scrollTop = this.$container.scrollHeight;
            e.preventDefault();
        }
        clear() {
            this.$output.innerHTML = '';
        }
        history(e) {
            var UP = 38;
            var DOWN = 40;
            var gotHistory = false;
            var selectionStart = this.$input.selectionStart;
            if (e.keyCode === UP && this.historyIndex !== 0 && selectionStart === 0) {
                this.historyIndex--;
                gotHistory = true;
            }
            if (e.keyCode === DOWN && this.historyIndex !== this.history.length - 1 && selectionStart === this.$input.value.length) {
                this.historyIndex++;
                gotHistory = true;
            }
            if (gotHistory) {
                this.$input.value = this.history[this.historyIndex];
            }
        }
    };
});
define('skylark-jotted/plugins/play',['../util'], function (util) {
    'use strict';
    return class PluginPlay {
        constructor(jotted, options) {
            options = util.extend(options, { firstRun: true });
            var priority = 10;
            var cache = {};
            var code = {};
            if (options.firstRun === false) {
                cache = {
                    html: {
                        type: 'html',
                        content: ''
                    },
                    css: {
                        type: 'css',
                        content: ''
                    },
                    js: {
                        type: 'js',
                        content: ''
                    }
                };
            }
            var $button = document.createElement('button');
            $button.className = 'jotted-button jotted-button-play';
            $button.innerHTML = 'Run';
            jotted.$container.appendChild($button);
            $button.addEventListener('click', this.run.bind(this));
            jotted.on('change', this.change.bind(this), priority);
            this.cache = cache;
            this.code = code;
            this.jotted = jotted;
        }
        change(params, callback) {
            this.code[params.type] = util.extend(params);
            if (typeof this.cache[params.type] !== 'undefined') {
                callback(null, this.cache[params.type]);
                this.cache[params.type].forceRender = null;
            } else {
                this.cache[params.type] = util.extend(params);
                callback(null, params);
            }
        }
        run() {
            for (let type in this.code) {
                this.cache[type] = util.extend(this.code[type], { forceRender: true });
                this.jotted.trigger('change', this.cache[type]);
            }
        }
    };
});
define('skylark-jotted/plugins/pen',[],function () {
    'use strict';
    return class PluginPen {
        constructor(jotted, options) {
            let panes = {
                html: {
                    title: 'HTML',
                    classChecker: 'jotted-has-html'
                },
                css: {
                    title: 'CSS',
                    classChecker: 'jotted-has-css'
                },
                js: {
                    title: 'JavaScript',
                    classChecker: 'jotted-has-js'
                },
                console: {
                    title: 'Console',
                    classChecker: 'jotted-plugin-console'
                }
            };
            let $availablePanes = [];
            for (let p in panes) {
                if (jotted.$container.classList.contains(panes[p].classChecker)) {
                    $availablePanes.push(jotted.$container.querySelector(`.jotted-pane-${ p }`));
                }
            }
            this.resizablePanes = [];
            for (let i = 0; i < $availablePanes.length; i++) {
                let type;
                for (let j = 0; j < $availablePanes[i].classList.length; j++) {
                    if ($availablePanes[i].classList[j].indexOf('jotted-pane-') !== -1) {
                        type = $availablePanes[i].classList[j].replace('jotted-pane-', '');
                        break;
                    }
                }
                if (!type) {
                    continue;
                }
                let $pane = {
                    container: $availablePanes[i],
                    expander: undefined
                };
                this.resizablePanes.push($pane);
                let $paneTitle = document.createElement('div');
                $paneTitle.classList.add('jotted-pane-title');
                $paneTitle.innerHTML = panes[type].title || type;
                let $paneElement = $availablePanes[i].firstElementChild;
                $paneElement.insertBefore($paneTitle, $paneElement.firstChild);
                if (i > 0) {
                    $pane.expander = document.createElement('div');
                    $pane.expander.classList.add('jotted-plugin-pen-expander');
                    $pane.expander.addEventListener('mousedown', this.startExpand.bind(this, jotted));
                    $paneElement.insertBefore($pane.expander, $paneTitle);
                }
            }
        }
        startExpand(jotted, event) {
            let $pane = this.resizablePanes.filter(pane => {
                return pane.expander === event.target;
            }).shift();
            let $previousPane = this.resizablePanes[this.resizablePanes.indexOf($pane) - 1];
            let $relativePixel = 100 / parseInt(window.getComputedStyle($pane.container.parentNode)['width'], 10);
            $pane.container.parentNode.style.display = 'none';
            $pane.startX = event.clientX;
            $pane.startWidth = parseFloat(window.getComputedStyle($pane.container)['width'], 10);
            $previousPane.startWidth = parseFloat(window.getComputedStyle($previousPane.container)['width'], 10);
            $pane.container.parentNode.style.display = '';
            $pane.mousemove = this.doDrag.bind(this, $pane, $previousPane, $relativePixel);
            $pane.mouseup = this.stopDrag.bind(this, $pane);
            document.addEventListener('mousemove', $pane.mousemove, false);
            document.addEventListener('mouseup', $pane.mouseup, false);
        }
        doDrag(pane, previousPane, relativePixel, event) {
            let ppNewWidth = previousPane.startWidth + (event.clientX - pane.startX) * relativePixel;
            let cpNewWidth = pane.startWidth - (event.clientX - pane.startX) * relativePixel;
            const PANE_MIN_SIZE = 10;
            if (ppNewWidth >= PANE_MIN_SIZE && cpNewWidth >= PANE_MIN_SIZE) {
                pane.container.style.maxWidth = 'none';
                previousPane.container.style.maxWidth = 'none';
                previousPane.container.style.width = `${ ppNewWidth }%`;
                pane.container.style.width = `${ cpNewWidth }%`;
            }
        }
        stopDrag(pane, event) {
            document.removeEventListener('mousemove', pane.mousemove, false);
            document.removeEventListener('mouseup', pane.mouseup, false);
        }
    };
});
define('skylark-jotted/bundle-plugins',[
    './plugins/render',
    './plugins/scriptless',
    './plugins/ace',
    './plugins/codemirror',
    './plugins/less',
    './plugins/coffeescript',
    './plugins/stylus',
    './plugins/babel',
    './plugins/markdown',
    './plugins/console',
    './plugins/play',
    './plugins/pen'
], function (PluginRender, PluginScriptless, PluginAce, PluginCodeMirror, PluginLess, PluginCoffeeScript, PluginStylus, PluginBabel, PluginMarkdown, PluginConsole, PluginPlay, PluginPen) {
    'use strict';
    return function BundlePlugins(jotted) {
        jotted.plugin('render', PluginRender);
        jotted.plugin('scriptless', PluginScriptless);
        jotted.plugin('ace', PluginAce);
        jotted.plugin('codemirror', PluginCodeMirror);
        jotted.plugin('less', PluginLess);
        jotted.plugin('coffeescript', PluginCoffeeScript);
        jotted.plugin('stylus', PluginStylus);
        jotted.plugin('babel', PluginBabel);
        jotted.plugin('markdown', PluginMarkdown);
        jotted.plugin('console', PluginConsole);
        jotted.plugin('play', PluginPlay);
        jotted.plugin('pen', PluginPen);
    };
});
define('skylark-jotted/Jotted',[
    'skylark-langx/skylark',
    './util',
    './template',
    './plugin',
    './pubsoup',
    './bundle-plugins'
], function (skylark, util, template, plugin, PubSoup, BundlePlugins) {
    'use strict';
    class Jotted {
        constructor($jottedContainer, opts) {
            if (!$jottedContainer) {
                throw new Error("Can't find Jotted container.");
            }
            var _private = {};
            this._get = function (key) {
                return _private[key];
            };
            this._set = function (key, value) {
                _private[key] = value;
                return _private[key];
            };
            var options = this._set('options', util.extend(opts, {
                files: [],
                showBlank: false,
                runScripts: true,
                pane: 'result',
                debounce: 250,
                plugins: []
            }));
            options.plugins.push('render');
            if (options.runScripts === false) {
                options.plugins.push('scriptless');
            }
            this._set('cachedContent', {
                html: null,
                css: null,
                js: null
            });
            var pubsoup = this._set('pubsoup', new PubSoup());
            this._set('trigger', this.trigger());
            this._set('on', function () {
                pubsoup.subscribe.apply(pubsoup, arguments);
            });
            this._set('off', function () {
                pubsoup.unsubscribe.apply(pubsoup, arguments);
            });
            var done = this._set('done', function () {
                pubsoup.done.apply(pubsoup, arguments);
            });
            done('change', this.errors.bind(this));
            var $container = this._set('$container', $jottedContainer);
            $container.innerHTML = template.container();
            util.addClass($container, template.containerClass());
            var paneActive = this._set('paneActive', options.pane);
            util.addClass($container, template.paneActiveClass(paneActive));
            this._set('$status', {});
            for (let type of [
                    'html',
                    'css',
                    'js'
                ]) {
                this.markup(type);
            }
            $container.addEventListener('keyup', util.debounce(this.change.bind(this), options.debounce));
            $container.addEventListener('change', util.debounce(this.change.bind(this), options.debounce));
            $container.addEventListener('click', this.pane.bind(this));
            this.$container = this._get('$container');
            this.on = this._get('on');
            this.off = this._get('off');
            this.done = this._get('done');
            this.trigger = this._get('trigger');
            this.paneActive = this._get('paneActive');
            this._set('plugins', {});
            plugin.init.call(this);
            for (let type of [
                    'html',
                    'css',
                    'js'
                ]) {
                this.load(type);
            }
            if (options.showBlank) {
                for (let type of [
                        'html',
                        'css',
                        'js'
                    ]) {
                    util.addClass($container, template.hasFileClass(type));
                }
            }
        }
        findFile(type) {
            var file = {};
            var options = this._get('options');
            for (let fileIndex in options.files) {
                let file = options.files[fileIndex];
                if (file.type === type) {
                    return file;
                }
            }
            return file;
        }
        markup(type) {
            var $container = this._get('$container');
            var $parent = $container.querySelector(`.jotted-pane-${ type }`);
            var file = this.findFile(type);
            var $editor = document.createElement('div');
            $editor.innerHTML = template.editorContent(type, file.url);
            $editor.className = template.editorClass(type);
            $parent.appendChild($editor);
            this._get('$status')[type] = $parent.querySelector('.jotted-status');
            if (typeof file.url !== 'undefined' || typeof file.content !== 'undefined') {
                util.addClass($container, template.hasFileClass(type));
            }
        }
        load(type) {
            var file = this.findFile(type);
            var $textarea = this._get('$container').querySelector(`.jotted-pane-${ type } textarea`);
            if (typeof file.content !== 'undefined') {
                this.setValue($textarea, file.content);
            } else if (typeof file.url !== 'undefined') {
                this.status('loading', [template.statusLoading(file.url)], {
                    type: type,
                    file: file
                });
                util.fetch(file.url, (err, res) => {
                    if (err) {
                        this.status('error', [template.statusFetchError(err)], { type: type });
                        return;
                    }
                    this.clearStatus('loading', { type: type });
                    this.setValue($textarea, res);
                });
            } else {
                this.setValue($textarea, '');
            }
        }
        setValue($textarea, val) {
            $textarea.value = val;
            this.change({ target: $textarea });
        }
        change(e) {
            var type = util.data(e.target, 'jotted-type');
            if (!type) {
                return;
            }
            var cachedContent = this._get('cachedContent');
            if (cachedContent[type] === e.target.value) {
                return;
            }
            cachedContent[type] = e.target.value;
            this.trigger('change', {
                type: type,
                file: util.data(e.target, 'jotted-file'),
                content: cachedContent[type]
            });
        }
        errors(errs, params) {
            this.status('error', errs, params);
        }
        pane(e) {
            if (!util.data(e.target, 'jotted-type')) {
                return;
            }
            var $container = this._get('$container');
            var paneActive = this._get('paneActive');
            util.removeClass($container, template.paneActiveClass(paneActive));
            paneActive = this._set('paneActive', util.data(e.target, 'jotted-type'));
            util.addClass($container, template.paneActiveClass(paneActive));
            e.preventDefault();
        }
        status(statusType = 'error', messages = [], params = {}) {
            if (!messages.length) {
                return this.clearStatus(statusType, params);
            }
            var $status = this._get('$status');
            util.addClass($status[params.type], template.statusClass(statusType));
            util.addClass(this._get('$container'), template.statusActiveClass(params.type));
            var markup = '';
            messages.forEach(function (err) {
                markup += template.statusMessage(err);
            });
            $status[params.type].innerHTML = markup;
        }
        clearStatus(statusType, params) {
            var $status = this._get('$status');
            util.removeClass($status[params.type], template.statusClass(statusType));
            util.removeClass(this._get('$container'), template.statusActiveClass(params.type));
            $status[params.type].innerHTML = '';
        }
        trigger() {
            var options = this._get('options');
            var pubsoup = this._get('pubsoup');
            if (options.debounce === false) {
                return function () {
                    pubsoup.publish.apply(pubsoup, arguments);
                };
            }
            var cooldown = {};
            var multiple = {};
            return function (topic, {
                type = 'default'
            } = {}) {
                if (cooldown[type]) {
                    multiple[type] = true;
                } else {
                    pubsoup.publish.apply(pubsoup, arguments);
                }
                clearTimeout(cooldown[type]);
                cooldown[type] = setTimeout(() => {
                    if (multiple[type]) {
                        pubsoup.publish.apply(pubsoup, arguments);
                    }
                    multiple[type] = null;
                    cooldown[type] = null;
                }, options.debounce);
            };
        }
    }
    Jotted.plugin = function () {
        return plugin.register.apply(this, arguments);
    };
    BundlePlugins(Jotted);
    return skylark.attach("itg.Jotted",Jotted);
});
define('skylark-jotted/main',[
	"./Jotted"
],function(Jotted){

	return Jotted;
});
define('skylark-jotted', ['skylark-jotted/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-jotted.js.map
