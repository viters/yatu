const Injector = require('./injector')

const retrieveAndBind = (className, fnName) => {
  const object = Injector.retrive(className)
  return object[fnName].bind(object)
}

const routes = [
  {method: 'get', path: '/', fn: retrieveAndBind('HelloController', 'sayHello')},
  {method: 'get', path: '/order/big', fn: retrieveAndBind('OrderController', 'big')},
  {method: 'get', path: '/order/mapped', fn: retrieveAndBind('OrderController', 'mapped')}
]

module.exports = routes