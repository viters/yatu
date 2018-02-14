const AbstractFnProxyStrategy = require('./abstract-fn-proxy-strategy')

class AsyncFnProxyStrategy extends AbstractFnProxyStrategy {
  execute () {
    return async (...args) => {
      this._descend()
      try {
        const {time, output} = await this._asyncMeasureTime(async () => await this._origMethod.apply(this._instance, args))
        this._ascend(time)

        return output
      } catch (error) {
        this._error(error)
      }
    }
  }
}

module.exports = AsyncFnProxyStrategy
