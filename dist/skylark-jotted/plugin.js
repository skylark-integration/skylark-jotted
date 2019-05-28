/**
 * skylark-jotted - A version of jotted( html/css/js playground) that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jotted/
 * @license MIT
 */
define(["./util","./template"],function(t,i){"use strict";var n=[];return{register:function(t,i){i._id=t,n.push(i)},init:function(){this._get("options").plugins.forEach(e=>{let s,r,o={};"string"==typeof e?r=e:"object"==typeof e&&(r=e.name,o=e.options||{}),s=function(t){for(let i in n){let e=n[i];if(e._id===t)return e}throw new Error(`Plugin ${t} is not registered.`)}(r),this._get("plugins")[e]=new s(this,o),t.addClass(this._get("$container"),i.pluginClass(r))})}}});
//# sourceMappingURL=sourcemaps/plugin.js.map
