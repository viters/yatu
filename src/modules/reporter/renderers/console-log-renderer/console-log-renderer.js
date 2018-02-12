const AbstractRenderer = require('../abstract-renderer')
const FnCallNoteType = require('../../../test-suite/fn-call-tree/fn-call-note-type.js')
const ch = {
  fgGreen: '\x1b[32m',
  fgCyan: '\x1b[36m',
  fgYellow: '\x1b[33m',
  bgRed: '\x1b[41m',
  reset: '\x1b[0m'
}

class ConsoleLogRenderer extends AbstractRenderer {
  constructor () {
    super()
    this._noteHandler = this._createNoteHandlers()
  }

  render (fnCallTreeRoot) {
    this._renderFnCall(fnCallTreeRoot)
  }

  _renderFnCall (fnCall, indent = 0) {
    if (!fnCall) {
      return
    }
    const gap = this._createIndent(indent)

    this._renderHeading(fnCall, gap)
    if (fnCall.error) {
      this._renderError(fnCall, gap)
    } else {
      fnCall.notes.forEach(note => this._noteHandler.handle(note, gap))
      this._renderSummary(fnCall, gap)
    }

    fnCall.children.forEach(child => this._renderFnCall(child, indent + 1))
  }

  _renderHeading (fnCall, gap) {
    const className = `${ch.fgYellow}${fnCall.className}${ch.reset}`
    const fnName = `${ch.fgCyan}${fnCall.fnName}${ch.reset}`
    console.log(`${gap}-> ${className}:${fnName}`)
  }

  _renderError (fnCall, gap) {
    console.log(`${gap}  ${ch.bgRed}!! ERROR: ${fnCall.error}${ch.reset}`)
  }

  _renderSummary (fnCall, gap) {
    const effectiveTime = `${ch.fgGreen}${fnCall.effectiveTime}${ch.reset} ms`
    const overallTime = `${ch.fgGreen}${fnCall.time}${ch.reset} ms`
    console.log(`${gap}  :: Finished in ${effectiveTime} (overall ${overallTime})`)
  }

  _createIndent (size) {
    return (new Array(size)).fill(' ').join('')
  }

  _createNoteHandlers () {
    const warningNoteHandler = new WarningNoteHandler()
    const unprocessedNoteHandler = new UnprocessedNoteHandler(warningNoteHandler)
    return new PostgresQueryNoteHandler(unprocessedNoteHandler)
  }
}

class NoteHandler {
  constructor (successor = null) {
    this._successor = successor

    if (this.constructor === NoteHandler) {
      throw new TypeError('Abstract class NoteHandler cannot be instantiated directly.')
    }
  }

  set successor (value) {
    this._successor = value
  }

  handle (note, gap) {
    return new Error('Method not implemented!')
  }
}

class PostgresQueryNoteHandler extends NoteHandler {
  handle (note, gap) {
    if (note.type === FnCallNoteType.PostgresQuery) {
      const output = `${note.query} || ${note.response[0][1]['QUERY PLAN']} || ${note.response[0][2]['QUERY PLAN']}`
      console.log(`${gap}  $$ ${output}`)
    } else if (this._successor) {
      this._successor.handle(note, gap)
    }
  }
}

class WarningNoteHandler extends NoteHandler {
  handle (note, gap) {
    if (note.type === FnCallNoteType.Warning) {
      const output = `Warning: ${note.warning}`
      console.log(`${gap}  ## ${output}`)
    } else if (this._successor) {
      this._successor.handle(note, gap)
    }
  }
}

class UnprocessedNoteHandler extends NoteHandler {
  handle (note, gap) {
    const output = `Unhandled note buffered`
    console.log(`${gap}  ## ${output}`)
  }
}

module.exports = ConsoleLogRenderer