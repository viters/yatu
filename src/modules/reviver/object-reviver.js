const Injector = require('../util/injector')
const ObjectProxifier = require('./object-proxifier/object-proxifier')
const SimpleForeignObject = require('./foreign-object/simple-foreign-object')

class ObjectReviver {
  constructor (objectProxifier = Injector.retrive(ObjectProxifier.name)) {
    this._objectProxifier = objectProxifier
  }

  revive (className, path, checkpoints, ctorArgsForeignObjects, fnCallTree) {
    const ClassPrototype = require('../../' + path)
    const classObject = new ClassPrototype(...(ctorArgsForeignObjects.map(x => x.instance)))
    const simpleForeignObject = new SimpleForeignObject(className, path, checkpoints, ctorArgsForeignObjects, classObject)

    if (!checkpoints || checkpoints.length === 0) {
      return simpleForeignObject
    }

    return this._objectProxifier.proxify(simpleForeignObject, fnCallTree)
  }
}

module.exports = ObjectReviver
