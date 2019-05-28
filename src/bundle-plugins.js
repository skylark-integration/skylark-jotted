define([
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