const ch = require('../util/console-helpers')

class ResultPrinter {
  printFnCallTree (fnCallTreeRoot) {
    this._printFnCall(fnCallTreeRoot)
  }

  _printFnCall (fnCall, indent = 0) {
    if (!fnCall) {
      return
    }

    const className = `${ch.fgYellow}${fnCall.className}${ch.reset}`
    const fnName = `${ch.fgCyan}${fnCall.fnName}${ch.reset}`
    const effectiveTime = `${ch.fgGreen}${fnCall.effectiveTime}${ch.reset} ms`
    const overallTime = `${ch.fgGreen}${fnCall.time}${ch.reset} ms`

    let tab = ''
    for (let i = 0; i < indent; i++) {
      tab += '  '
    }

    console.log(`${tab}-> ${className}:${fnName}`)
    if (fnCall.error) {
      console.log(`${tab}  ${ch.bgRed}!! ERROR: ${fnCall.error}${ch.reset}`)
    } else {
      fnCall.msg.forEach(x => console.log(`${tab}  $$ ${x}`))
      console.log(`${tab}  :: Finished in ${effectiveTime} (overall ${overallTime})`)
    }

    fnCall.children.forEach(x => this._printFnCall(x, indent + 1))
  }
}

module.exports = ResultPrinter
