const fs = require('fs')
const PathConverter = require('./path-converter')
const ConfigValidator = require('./config-validator')
const Config = require('./config')

class ConfigReader {
  constructor (pathToProject) {
    this._pathConverter = new PathConverter(pathToProject)
    this._configValidator = new ConfigValidator()
    this._config = null
  }

  readConfigFile (src) {
    this._config = JSON.parse(fs.readFileSync(src, 'utf-8'))
    this._validateConfig()
    this._convertPathsInConfig()

    return new Config(this._config)
  }

  _validateConfig () {
    if (this._configValidator.atLeastOneTestCase(this._config)) {
      throw new Error('You must provide at least one test case in config file!')
    }

    this._config = this._config.map(x => {
      const errors = []
      this._validateTestNode(x, errors)
      return Object.assign(x, {errors: errors.filter(Boolean)})
    })
  }

  _validateTestNode (testCase, errors) {
    errors.push(
      this._configValidator.properEntryFn(testCase),
      this._configValidator.hasPath(testCase),
      this._configValidator.lensIsArray(testCase)
    )

    if (testCase.lens && testCase.lens.length >= 0) {
      testCase.lens.forEach(x => this._validateTestNode(x, errors))
    }
  }

  _convertPathsInConfig () {
    this._config = this._config.map(x => this._pathConverter.convertPathsInTestCase(x))
  }
}

module.exports = ConfigReader
