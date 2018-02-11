const Injector = require('../util/injector')
const ObjectReviver = require('./object-reviver')

class ObjectTreeReviver {
  constructor (objectReviver = Injector.retrive(ObjectReviver.name)) {
    this._objectReviver = objectReviver
  }

  revive (testCaseConfig, fnCallTree) {
    const reviveFn = (className, path, checkpoints, ctorArgs, type) =>
      this._objectReviver.revive(className, path, checkpoints, ctorArgs, type,
        fnCallTree)

    return this._reviveRoot(testCaseConfig, reviveFn)
  }

  _reviveRoot (testCaseConfig, reviveFn) {
    return reviveFn(
      testCaseConfig.class,
      testCaseConfig.path,
      [testCaseConfig.entry],
      testCaseConfig.type,
      this._reviveDependencies(testCaseConfig.lens, reviveFn)
    )
  }

  _reviveDependencies (lens, reviveFn) {
    if (!lens || lens.length === 0) {
      return []
    }

    return lens.map(dep =>
      reviveFn(
        dep.class,
        dep.path,
        dep.checkpoints,
        dep.type,
        this._reviveDependencies(dep.lens, reviveFn)
      )
    )
  }
}

module.exports = ObjectTreeReviver
