const AbstractFnProxyStrategy = require('./abstract-fn-proxy-strategy')
const Injector = require('../../../util/injector')

class AsyncFnProxyStrategy extends AbstractFnProxyStrategy {
  execute () {
    return async (...args) => {
      const queryContainer = []
      this._registerLogger(queryContainer)
      const dbWrapper = Injector.retrive('DbWrapper')

      this._fnCallTree.descend(this._className, this._fnName)
      try {
        const startDate = new Date()
        await this._origMethod.apply(this._instance, args)
        const endDate = new Date()
        const compTime = endDate.getTime() - startDate.getTime()

        // TODO: Fix wrong additional time
        const queries = await Promise.all(queryContainer.map(x => dbWrapper.query('EXPLAIN ANALYZE ' + x)))
        const msg = queryContainer.map((q, i) => `${q} || ${queries[i][0][1]['QUERY PLAN']} || ${queries[i][0][2]['QUERY PLAN']}`)

        this._fnCallTree.ascend(compTime, {msg})
      } catch (error) {
        this._fnCallTree.ascend(-1, {error})
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

module.exports = AsyncFnProxyStrategy
