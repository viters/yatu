const ProxyForeignObject = require('../foreign-object/proxy-foreign-object')
const SyncFnProxyStrategy = require('./fn-proxy-strategy/sync-fn-proxy-strategy')

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

        const strategy = checkpointDefinition.async ? 'async' : 'sync'

        return this._provideProxyStrategy(strategy, {
          className: simpleForeignObject.className,
          fnName: propKey,
          origMethod: origMethod,
          fnCallTree: fnCallTree,
          instance: simpleForeignObject.instance
        }).execute()
      }
    })
  }

  _provideProxyStrategy (syncOrAsync, settings) {
    switch (syncOrAsync) {
      case 'sync':
        return new SyncFnProxyStrategy(settings)
      default:
        throw new Error(`Strategy ${syncOrAsync} is not implemented!`)
    }
  }
}

module.exports = ObjectProxifier
