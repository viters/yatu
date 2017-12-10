class ForeignObject {
  constructor (className, path, checkpoints, ctorArgsForeignObjects) {
    this._className = className
    this._path = path
    this._checkpoints = checkpoints
    this._ctorArgsForeignObjects = ctorArgsForeignObjects
  }

  get className () {
    return this._className
  }

  get path () {
    return this._path
  }

  get checkpoints () {
    return this._checkpoints
  }

  get ctorArgsForeignObjects () {
    return this._ctorArgsForeignObjects
  }
}

module.exports = ForeignObject
