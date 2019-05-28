define(function () {
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