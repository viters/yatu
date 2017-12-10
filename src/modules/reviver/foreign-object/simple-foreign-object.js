const ForeignObject = require('./foreign-object')

class SimpleForeignObject extends ForeignObject {
  constructor (name, path, checkpoints, ctorArgsForeignObjects, instance) {
    super(name, path, checkpoints, ctorArgsForeignObjects)
    this._instance = instance
  }

  get instance () {
    return this._instance
  }
}

module.exports = SimpleForeignObject
