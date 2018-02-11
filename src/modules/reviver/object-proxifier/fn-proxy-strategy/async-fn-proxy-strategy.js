const AbstractFnProxyStrategy = require('./abstract-fn-proxy-strategy')

class AsyncFnProxyStrategy extends AbstractFnProxyStrategy {
  execute () {
    return async (...args) => {
      this._descend()
      try {
        const time = await this._asyncMeasureTime(() => this._origMethod.apply(this._instance, args))
        this._ascend(time)
      } catch (error) {
        this._error(error)
      }
    }
  }
}

module.exports = AsyncFnProxyStrategy
