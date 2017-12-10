const ForeignObject = require('./foreign-object')

class ProxyForeignObject extends ForeignObject {
  constructor (simpleForeignObject, instance) {
    super(simpleForeignObject.name,
      simpleForeignObject.path,
      simpleForeignObject.checkpoints,
      simpleForeignObject.ctorArgsForeignObjects)
    this._instance = instance
  }

  get instance () {
    return this._instance
  }
}

module.exports = ProxyForeignObject
