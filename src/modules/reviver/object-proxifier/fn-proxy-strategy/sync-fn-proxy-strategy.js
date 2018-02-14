const AbstractFnProxyStrategy = require('./abstract-fn-proxy-strategy')

class SyncFnProxyStrategy extends AbstractFnProxyStrategy {
  execute () {
    return (...args) => {
      this._descend()
      try {
        const {time, output} = this._measureTime(() => this._origMethod.apply(this._instance, args))
        this._ascend(time)

        return output
      } catch (error) {
        this._error(error)
      }
    }
  }
}

module.exports = SyncFnProxyStrategy
