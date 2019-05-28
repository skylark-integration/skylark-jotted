define([
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