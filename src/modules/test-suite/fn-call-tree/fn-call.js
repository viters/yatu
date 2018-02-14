const FnCallStatus = require('./fn-call-status')
const FnCallNoteType = require('./fn-call-note-type')

class FnCall {
  constructor (className, fnName) {
    this._className = className
    this._fnName = fnName
    this._children = []
    this._status = FnCallStatus.Start
    this._time = null
    this._error = null
    this._notes = []
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

  get notes () {
    return this._notes
  }

  addChild (fnCall) {
    this._children.push(fnCall)
  }

  markComplete (time) {
    this._time = time
    this._status = FnCallStatus.Complete
  }

  markPromised (time, notes) {
    this._time = time
    return new Promise((resolve) => {
      Promise.all(notes.map(x => x.promise)).then((responses) => {
        responses.forEach((response, i) => {
          this._notes.push(Object.assign(notes[i], {response}))
        })

        this._status = FnCallStatus.Complete
        resolve()
      }, () => {
        this._notes.push({
          type: FnCallNoteType.Warning,
          warning: 'At least one promise was rejected'
        })

        this._status = FnCallStatus.Complete
        resolve()
      })
    })

  }

  markError (error) {
    this._error = error
    this._status = FnCallStatus.Error
  }
}

module.exports = FnCall
