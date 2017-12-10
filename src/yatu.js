const ConfigReader = require('./modules/config/config-reader')
const TestRunner = require('./modules/test-runner/test-runner')
const ResultPrinter = require('./modules/result/result-printer')
const TestSuite = require('./modules/test-suite/test-suite')
const Injector = require('./modules/util/injector')
const ObjectTreeReviver = require('./modules/reviver/object-tree-reviver')
const ObjectProxifier = require('./modules/reviver/object-proxifier/object-proxifier')
const ObjectReviver = require('./modules/reviver/object-reviver')

class Yatu {
  constructor () {
    this._pathToProject = process.argv[2]
    this._pathToTestsFile = this._pathToProject + 'tests.json'
    this._config = null
    this._resultPrinter
    this._testRunner = null
    this._testSuite = null
  }

  bootstrap () {
    this._createDependencies()
    this._addDependenciesToInjector()

    this._testSuite.prepare(this._config)
    this._testSuite.execute()
  }

  _createDependencies () {
    this._config = this._readConfig()
    this._resultPrinter = this._createResultPrinter()
    this._testRunner = this._createTestRunner()
    this._testSuite = this._createTestSuite()
  }

  _readConfig () {
    const configReader = new ConfigReader(this._pathToProject)
    return configReader.readConfigFile(this._pathToTestsFile)
  }

  _createResultPrinter () {
    return new ResultPrinter()
  }

  _createTestRunner () {
    return new TestRunner(this._resultPrinter)
  }

  _createTestSuite () {
    return new TestSuite(this._testRunner)
  }

  _addDependenciesToInjector () {
    Injector.perpetuate(this._config)
    Injector.perpetuate(this._resultPrinter)
    Injector.perpetuate(new ObjectProxifier())
    Injector.perpetuate(new ObjectReviver())
    Injector.perpetuate(new ObjectTreeReviver())
  }
}

module.exports = Yatu
