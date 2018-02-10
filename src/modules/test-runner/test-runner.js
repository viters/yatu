class TestRunner {
  constructor () {
    this._consoleLog = console.log
    this._consoleError = console.error
  }

  run (testCase) {
    this._disableConsoleSideEffects()
    testCase.entryPoint(...testCase.entryArgs)
    this._enableConsoleSideEffects()
    return testCase.isFinished
  }

  _disableConsoleSideEffects () {
    console.log = () => null
    console.error = (e) => { throw new Error(e) }
  }

  _enableConsoleSideEffects () {
    console.log = this._consoleLog
    console.error = this._consoleError
  }
}

module.exports = TestRunner
