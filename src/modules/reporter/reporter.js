const ConsoleLogRenderer = require('./renderers/console-log-renderer/console-log-renderer')

class Reporter {
  constructor (strategy) {
    this._strategy = this._chooseRenderer(strategy)
  }

  render (fnCallTreeRoot) {
    this._strategy.render(fnCallTreeRoot)
  }

  _chooseRenderer (strategy) {
    switch (strategy) {
      case 'console-log':
        return new ConsoleLogRenderer()
      default:
        throw new Error(`Renderer strategy ${strategy} is not implemented.`)
    }
  }
}

module.exports = Reporter