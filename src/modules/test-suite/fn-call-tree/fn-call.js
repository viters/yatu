const FnCallStatus = require('./fn-call-status')

class FnCall {
  constructor (className, fnName) {
    this._className = className
    this._fnName = fnName
    this._children = []
    this._status = FnCallStatus.START
    this._time = null
    this._error = null
    this._dbResponses = []
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

  get dbResponses () {
    return this._dbResponses
  }

  addChild (fnCall) {
    this._children.push(fnCall)
  }

  markComplete (time) {
    this._time = time
    this._status = FnCallStatus.COMPLETE
  }

  markPromised (time, dbQueryInfo) {
    this._time = time
    return new Promise((resolve, reject) => {
      Promise.all(dbQueryInfo.map(x => x.promise)).then((responses) => {
        responses.forEach((r, i) => {
          this._dbResponses.push({
            query: dbQueryInfo[i].query,
            response: r
          })
        })
        this._status = FnCallStatus.COMPLETE
        resolve()
      }, () => {
        resolve()
      })
    })

  }

  markError (error) {
    this._error = error
    this._status = FnCallStatus.ERROR
  }
}

module.exports = FnCall
