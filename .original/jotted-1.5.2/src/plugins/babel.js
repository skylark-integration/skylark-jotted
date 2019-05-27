/* babel plugin
 */

import * as util from '../util.js'

export default class PluginBabel {
  constructor (jotted, options) {
    var priority = 20

    this.options = util.extend(options, {})

    // check if babel is loaded
    if (typeof window.Babel !== 'undefined') {
      // using babel-standalone
      this.babel = window.Babel
    } else if (typeof window.babel !== 'undefined') {
      // using browser.js from babel-core 5.x
      this.babel = {
        transform: window.babel
      }
    } else {
      return
    }

    // change js link label
    jotted.$container.querySelector('a[data-jotted-type="js"]').innerHTML = 'ES2015'

    jotted.on('change', this.change.bind(this), priority)
  }

  change (params, callback) {
    // only parse js content
    if (params.type === 'js') {
      try {
        params.content = this.babel.transform(params.content, this.options).code
      } catch (err) {
        return callback(err, params)
      }

      callback(null, params)
    } else {
      // make sure we callback either way,
      // to not break the pubsoup
      callback(null, params)
    }
  }
}
