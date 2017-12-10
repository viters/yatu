class TestRunner {
  constructor (resultPrinter) {
    this._resultPrinter = resultPrinter
    this._consoleLog = console.log
    this._consoleError = console.error
  }

  run (testCase) {
    this._disableConsoleSideEffects()
    testCase.entryPoint(...testCase.entryArgs)
    testCase.isFinished.then(fnCallTreeRoot => this._resultPrinter.printFnCallTree(fnCallTreeRoot))
    this._enableConsoleSideEffects()
  }

  _disableConsoleSideEffects () {
    console.log = (..._) => null
    console.error = (e) => { throw new Error(e) }
  }

  _enableConsoleSideEffects () {
    console.log = this._consoleLog
    console.error = this._consoleError
  }
}

module.exports = TestRunner
