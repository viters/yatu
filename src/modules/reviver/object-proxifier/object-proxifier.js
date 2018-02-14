const ProxyForeignObject = require('../foreign-object/proxy-foreign-object')
const SyncFnProxyStrategy = require('./fn-proxy-strategy/sync-fn-proxy-strategy')
const AsyncFnProxyStrategy = require('./fn-proxy-strategy/async-fn-proxy-strategy')
const PsqlSequelizeFnProxyStrategy = require('./fn-proxy-strategy/psql-sequelize-fn-proxy-strategy')

class ObjectProxifier {
  proxify (simpleForeignObject, fnCallTree) {
    const proxyInstance = this._getProxyInstance(simpleForeignObject, fnCallTree)

    return new ProxyForeignObject(simpleForeignObject, proxyInstance)
  }

  _getProxyInstance (simpleForeignObject, fnCallTree) {
    return new Proxy(simpleForeignObject.instance, {
      get: (target, propKey) => {
        const origMethod = target[propKey]
        const checkpointDefinition = simpleForeignObject.checkpoints.find(x => x.name === propKey)

        if (!checkpointDefinition) {
          return origMethod
        }

        return this._provideProxyStrategy(checkpointDefinition.strategy || 'sync', {
          className: simpleForeignObject.className,
          fnName: propKey,
          origMethod: origMethod,
          fnCallTree: fnCallTree,
          instance: simpleForeignObject.instance
        }).execute()
      }
    })
  }

  _provideProxyStrategy (strategy, settings) {
    switch (strategy) {
      case 'sync':
        return new SyncFnProxyStrategy(settings)
      case 'async':
        return new AsyncFnProxyStrategy(settings)
      case 'psqlSequelize':
        return new PsqlSequelizeFnProxyStrategy(settings)
      default:
        throw new Error(`Strategy ${strategy} is not implemented!`)
    }
  }
}

module.exports = ObjectProxifier
