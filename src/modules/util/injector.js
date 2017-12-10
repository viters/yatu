class Injector {
  static retrive (className) {
    if (!Injector._objectPool.hasOwnProperty(className)) {
      throw new Error(`There is no ${className} in object pool!`)
    }

    return Injector._objectPool[className]
  }

  static perpetuate (obj) {
    const className = obj.constructor.name

    if (Injector._objectPool.hasOwnProperty(className)) {
      throw new Error(`Object ${className} already exists in object pool!`)
    }

    Injector._objectPool[className] = obj
  }
}

Injector._objectPool = {}

module.exports = Injector
