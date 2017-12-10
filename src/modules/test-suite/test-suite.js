const TestCase = require('./test-case')

class TestSuite {
  constructor (testRunner) {
    this._testRunner = testRunner
    this._testCases = []
  }

  prepare (config) {
    this._testCases = config.data.map((testCaseConfig, i) => new TestCase(i, testCaseConfig))
  }

  execute () {
    this._testCases.forEach(x => this._testRunner.run(x))
  }
}

module.exports = TestSuite
