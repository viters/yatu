const FnCallStatus = require('./fn-call-status')

class FnCall {
  constructor (className, fnName) {
    this._className = className
    this._fnName = fnName
    this._children = []
    this._status = FnCallStatus.START
    this._time = null
    this._error = null
  }

  get className () {
    return this._className
  }

  get fnName () {
    return this._fnName
  }

  get children () {
    return this._children
  }

  get status () {
    return this._status
  }

  get time () {
    return this._time
  }

  get effectiveTime () {
    return this._time - this._children.map(x => x.time).reduce((a, b) => a + b, 0)
  }

  get error () {
    return this._error
  }

  addChild (fnCall) {
    this._children.push(fnCall)
  }

  markComplete (time) {
    this._time = time
    this._status = FnCallStatus.COMPLETE
  }

  markError (error) {
    this._error = error
    this._status = FnCallStatus.ERROR
  }
}

module.exports = FnCall
