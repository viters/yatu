const AbstractFnProxyStrategy = require('./abstract-fn-proxy-strategy')
const Injector = require('../../../util/injector')

class DbFnProxyStrategy extends AbstractFnProxyStrategy {
  execute () {
    return async (...args) => {
      const queryContainer = []
      this._registerLogger(queryContainer)
      const dbWrapper = Injector.retrive('DbWrapper')

      this._descend()
      try {
        const time = await this._asyncMeasureTime(() => this._origMethod.apply(this._instance, args))

        const dbQueryInfo = queryContainer.map(x => ({
          query: x,
          promise: dbWrapper.query('EXPLAIN ANALYZE ' + x)
        }))

        this._deregisterLogger()

        this._ascendWithPromise(time, dbQueryInfo)
      } catch (error) {
        this._error(error)
      }
    }
  }

  _registerLogger (container) {
    const seq = Object.getOwnPropertyNames(this._instance).find(
      p => typeof this._instance[p] === 'object' && this._instance[p].constructor.name === 'Sequelize'
    )

    this._seqInstance = this._instance[seq]
    this._oldLogger = this._seqInstance.options.logging

    this._seqInstance.options.logging = (str) => {
      const query = str.split(': ')[1]
      container.push(query)
    }
  }

  _deregisterLogger () {
    this._seqInstance.options.logging = this._oldLogger
  }
}

module.exports = DbFnProxyStrategy
