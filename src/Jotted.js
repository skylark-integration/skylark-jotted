define([
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