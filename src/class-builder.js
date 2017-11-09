module.exports = class ClassBuilder {
  constructor (className, path, fnsToProxy, ctorArgs, testFlow) {
    this._name = className
    this._path = path
    this._fnsToProxy = fnsToProxy
    this._ctorArgs = ctorArgs
    this._testFlow = testFlow
  }

  build () {
    const ClassPrototype = require(this._path)
    const classObject = new ClassPrototype(...this._ctorArgs)

    if (!this._fnsToProxy || this._fnsToProxy.length === 0) {
      return classObject
    }

    return this._proxifyObj(classObject)
  }

  _proxifyObj (obj) {
    return new Proxy(obj, {
      get: (target, propKey, receiver) => {
        const origMethod = target[propKey]

        if (!~this._fnsToProxy.indexOf(propKey)) {
          return origMethod
        }

        return (...args) => {
          this._testFlow.descend(this._name, propKey)
          console.log('ran', propKey)
          try {
            const startDate = new Date()
            origMethod.apply(obj, args)
            const endDate = new Date()
            const compTime = endDate.getTime() - startDate.getTime()
            this._testFlow.ascend('OK', compTime)
          } catch (e) {
            this._testFlow.ascend('ERROR', -1, e)
          }
        }
      }
    })
  }
}
