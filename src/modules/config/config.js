const deepFreeze = require('deep-freeze')

class Config {
  constructor (obj) {
    this._data = deepFreeze(obj)
  }

  get data () {
    return this._data
  }
}

module.exports = Config
