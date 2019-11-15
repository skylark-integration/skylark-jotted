require.config({
  baseUrl: "./"
  ,map: {
    '*': {
      'jquery': 'skylark-jquery/core'
    }
  }
  , shim: {
  }
  ,packages : [
           {
           name : "skylark-langx-arrays",
           location : "../node_modules/skylark-langx-arrays/dist/uncompressed/skylark-langx-arrays",
            main: 'main'
         },
         {
           name : "skylark-langx-aspect",
           location : "../node_modules/skylark-langx-aspect/dist/uncompressed/skylark-langx-aspect",
            main: 'main'
         },
         {
           name : "skylark-langx-async",
           location : "../node_modules/skylark-langx-async/dist/uncompressed/skylark-langx-async",
            main: 'main'
         },
         {
           name : "skylark-langx-datetimes",
           location : "../node_modules/skylark-langx-datetimes/dist/uncompressed/skylark-langx-datetimes",
            main: 'main'
         },
         {
           name : "skylark-langx-emitter",
           location : "../node_modules/skylark-langx-emitter/dist/uncompressed/skylark-langx-emitter",
            main: 'main'
         },
         {
           name : "skylark-langx-funcs",
           location : "../node_modules/skylark-langx-funcs/dist/uncompressed/skylark-langx-funcs",
            main: 'main'
         },
         {
           name : "skylark-langx-hoster",
           location : "../node_modules/skylark-langx-hoster/dist/uncompressed/skylark-langx-hoster",
            main: 'main'
         },
         {
           name : "skylark-langx-klass",
           location : "../node_modules/skylark-langx-klass/dist/uncompressed/skylark-langx-klass",
            main: 'main'
         },
         {
           name : "skylark-langx-ns",
           location : "../node_modules/skylark-langx-ns/dist/uncompressed/skylark-langx-ns",
            main: 'main'
         },
         {
           name : "skylark-langx-numbers",
           location : "../node_modules/skylark-langx-numbers/dist/uncompressed/skylark-langx-numbers",
            main: 'main'
         },
         {
           name : "skylark-langx-objects",
           location : "../node_modules/skylark-langx-objects/dist/uncompressed/skylark-langx-objects",
            main: 'main'
         },
         {
           name : "skylark-langx-strings",
           location : "../node_modules/skylark-langx-strings/dist/uncompressed/skylark-langx-strings",
            main: 'main'
         },
         {
           name : "skylark-langx-topic",
           location : "../node_modules/skylark-langx-topic/dist/uncompressed/skylark-langx-topic",
            main: 'main'
         },
         {
           name : "skylark-langx-types",
           location : "../node_modules/skylark-langx-types/dist/uncompressed/skylark-langx-types",
            main: 'main'
         },
         {
           name : "skylark-langx-xhr",
           location : "../node_modules/skylark-langx-xhr/dist/uncompressed/skylark-langx-xhr",
            main: 'main'
         },

         {
           name : "skylark-domx-browser",
           location : "../node_modules/skylark-domx-browser/dist/uncompressed/skylark-domx-browser",
            main: 'main'
         },
         {
           name : "skylark-domx-css",
           location : "../node_modules/skylark-domx-css/dist/uncompressed/skylark-domx-css",
            main: 'main'
         },
         {
           name : "skylark-domx-browser",
           location : "../node_modules/skylark-domx-browser/dist/uncompressed/skylark-domx-browser",
            main: 'main'
         },
         {
           name : "skylark-domx-data",
           location : "../node_modules/skylark-domx-data/dist/uncompressed/skylark-domx-data",
            main: 'main'
         },
         {
           name : "skylark-domx-eventer",
           location : "../node_modules/skylark-domx-eventer/dist/uncompressed/skylark-domx-eventer",
            main: 'main'
         },
         {
           name : "skylark-domx-finder",
           location : "../node_modules/skylark-domx-finder/dist/uncompressed/skylark-domx-finder",
            main: 'main'
         },
         {
           name : "skylark-domx-fx",
           location : "../node_modules/skylark-domx-fx/dist/uncompressed/skylark-domx-fx",
            main: 'main'
         },
         {
           name : "skylark-domx-geom",
           location : "../node_modules/skylark-domx-geom/dist/uncompressed/skylark-domx-geom",
            main: 'main'
         },
         {
           name : "skylark-domx-images",
           location : "../node_modules/skylark-domx-images/dist/uncompressed/skylark-domx-images",
            main: 'main'
         },
         {
           name : "skylark-domx-noder",
           location : "../node_modules/skylark-domx-noder/dist/uncompressed/skylark-domx-noder",
            main: 'main'
         },
         {
           name : "skylark-domx-plugins",
           location : "../node_modules/skylark-domx-plugins/dist/uncompressed/skylark-domx-plugins",
            main: 'main'
         },
         {
           name : "skylark-domx-query",
           location : "../node_modules/skylark-domx-query/dist/uncompressed/skylark-domx-query",
            main: 'main'
         },

         {
           name : "skylark-domx-scripter",
           location : "../node_modules/skylark-domx-scripter/dist/uncompressed/skylark-domx-scripter",
            main: 'main'
         },
         {
           name : "skylark-domx-styler",
           location : "../node_modules/skylark-domx-styler/dist/uncompressed/skylark-domx-styler",
            main: 'main'
         },
         {
           name : "skylark-domx-tables",
           location : "../node_modules/skylark-domx-tables/dist/uncompressed/skylark-domx-tables",
            main: 'main'
         },
         {
           name : "skylark-domx-transforms",
           location : "../node_modules/skylark-domx-transforms/dist/uncompressed/skylark-domx-transforms",
            main: 'main'
         },
         {
           name : "skylark-domx-velm",
           location : "../node_modules/skylark-domx-velm/dist/uncompressed/skylark-domx-velm",
            main: 'main'
         },
                  
         {
           name : "skylark-data-collection" ,
           location : "../node_modules/skylark-data-collection/dist/uncompressed/skylark-data-collection",
            main: 'main'
         },
         {
           name : "skylark-storages-diskfs" ,
           location : "../node_modules/skylark-storages-diskfs/dist/uncompressed/skylark-storages-diskfs",
            main: 'main'
         },
         {
           name : "skylark-net-http" ,
           location : "../node_modules/skylark-net-http/dist/uncompressed/skylark-net-http",
            main: 'main'
         },
     { name: "skylark-langx", location: "../node_modules/skylark-langx/dist/uncompressed/skylark-langx" },
     { name: "skylark-utils-dom", location: "../node_modules/skylark-utils-dom/dist/uncompressed/skylark-utils-dom"},
     { name: "skylark-ace", location: "../node_modules/skylark-ace/dist/uncompressed/skylark-ace"},
     { name: "skylark-codemirror", location: "../node_modules/skylark-codemirror/dist/uncompressed/skylark-codemirror"},
     { name: "skylark-jotted", location: "../src" }
  ],

});
 
var form = {};

require([
//  "../dist/uncompressed/skylark-jotted-all.js"
], function() {
  require([
    "skylark-utils-dom/query",
    "skylark-jotted"
  ], function ($,Jotted) {

  var addEventListener = (function() {

    if('addEventListener' in window.Element.prototype) {
      return function(type, listener) {
        this.addEventListener(type, listener, false);
      };
    }

    return function(type, listener) {
      this.attachEvent('on' + type, listener);
    };

  })();

  var toggleClass = function(node, className) {

    var foundClassPosition = node.className.indexOf(className);

    if(foundClassPosition === -1) {
      node.className += ' ' + className;
    } else {

      var tempClass = node.className.substr(0, foundClassPosition - 1);

      node.className = tempClass + node.className.substr(className.length + foundClassPosition);
    }

  };

  var toggleDropdown = function(e) {

    var dropdowns = document.querySelectorAll('.dropdown');
    var i;

    var target = e.target || e.srcElement;

    if(target.className.indexOf('dropdown-button') === -1) {

      // close all dropdowns
      for(i = 0; i < dropdowns.length; i++) {
        if(dropdowns[i].className.indexOf('dropdown-active') !== -1) {
          toggleClass(dropdowns[i], 'dropdown-active');
        }
      }

    } else {

      var dropdown = target.parentNode;

      toggleClass(dropdown, 'dropdown-active');

      e.preventDefault && e.preventDefault();

    }

  };

  var init = function() {
    addEventListener.call(document.body, 'click', toggleDropdown);

    var $jdemo = document.querySelector('.jotted-demo')
    if ($jdemo) {
      // ace demo
      new Jotted($jdemo, {
        files: [
          {
            type: 'html',
            content: he.decode(document.querySelector('.demo-content code').innerHTML)
//            content: document.querySelector('.demo-content code').innerHTML
          }
        ],
        plugins: [
          'codemirror'
        ]
      })
    }

  };

  init();

  });

});

