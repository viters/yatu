class AbstractFnProxyStrategy {
  constructor (settings) {
    this._className = settings.className
    this._fnName = settings.fnName
    this._origMethod = settings.origMethod
    this._fnCallTree = settings.fnCallTree
    this._instance = settings.instance
  }

  execute () {
    return new Error('Method not implemented!')
  }
}

module.exports = AbstractFnProxyStrategy
