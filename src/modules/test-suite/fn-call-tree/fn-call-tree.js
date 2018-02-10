const FnCall = require('./fn-call')

class FnCallTree {
  constructor () {
    this._root = null
    this._current = null
    this._previous = []
    this._isFinished = new Promise((resolve) => {
      this._finish = resolve
    })
  }

  get root () {
    return this._root
  }

  get isFinished () {
    return this._isFinished
  }

  descend (className, fnName) {
    const fnCall = new FnCall(className, fnName)

    if (!this._root) {
      this._root = fnCall
    } else {
      this._current.addChild(fnCall)
    }

    this._takeStep(fnCall)
  }

  ascend (time, {error, msg} = {}) {
    if (!error) {
      this._current.markComplete(time, msg)
    } else {
      this._current.markError(error)
    }

    this._stepBack()
  }

  _takeStep (nextStep) {
    this._previous.push(this._current)
    this._current = nextStep
  }

  _stepBack () {
    this._current = this._previous.pop()

    if (this._previous.length === 0) {
      this._finish(this.root)
    }
  }
}

module.exports = FnCallTree
