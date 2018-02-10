const AbstractFnProxyStrategy = require('./abstract-fn-proxy-strategy')

class AsyncFnProxyStrategy extends AbstractFnProxyStrategy {
  execute () {
    return async (...args) => {
      this._fnCallTree.descend(this._className, this._fnName)
      try {
        const startDate = new Date()
        await this._origMethod.apply(this._instance, args)
        const endDate = new Date()
        const compTime = endDate.getTime() - startDate.getTime()
        this._fnCallTree.ascend(compTime)
      } catch (error) {
        this._fnCallTree.ascend(-1, {error})
      }
    }
  }
}

module.exports = AsyncFnProxyStrategy
