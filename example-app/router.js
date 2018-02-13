const Injector = require('./injector')

const retrieveAndBind = (className, fnName) => {
  const object = Injector.retrive(className)
  return object[fnName].bind(object)
}

const routes = [
  {method: 'get', path: '/', fn: retrieveAndBind('HelloController', 'sayHello')}
]

module.exports = routes