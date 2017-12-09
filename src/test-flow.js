const ch = require('./console-helpers')

module.exports = class TestFlow {
  constructor () {
    this._flow = null
    this._current = null
    this._previous = []
  }

  descend (className, fn) {
    if (!this._current) {
      this._current = {className, fn, children: []}
      this._flow = this._current
    } else {
      let newElem = {className, fn, children: []}
      this._current.children.push(newElem)
      this._previous.push(this._current)
      this._current = newElem
    }
  }

  ascend (status, time, error = null) {
    this._current.status = status
    this._current.time = time
    this._current.error = error

    this._current = this._previous.pop()
  }

  getEffectiveTime(node) {
    return node.time - node.children.map(x => x.time).reduce((prev, curr) => prev + curr, 0)
  }

  print () {
    this._printStep(this._flow)
  }

  _printStep (step, ident = 0) {
    if (!step) {
      return
    }

    const className = `${ch.fgYellow}${step.className}${ch.reset}`
    const fnName = `${ch.fgCyan}${step.fn}${ch.reset}`
    const effectiveTime = `${ch.fgGreen}${this.getEffectiveTime(step)}${ch.reset} ms`
    const overallTime = `${ch.fgGreen}${step.time}${ch.reset} ms`

    let tab = ''
    for (let i = 0; i < ident; i++) {
      tab += '  '
    }

    console.log(`${tab}-> ${className}:${fnName}`)
    console.log(`${tab}  :: Finished in ${effectiveTime} (overall ${overallTime})`)

    step.children.forEach(x => this._printStep(x, ident + 1))
  }
}
