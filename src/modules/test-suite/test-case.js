const FnCallTree = require('./fn-call-tree/fn-call-tree')
const Injector = require('../util/injector')
const ObjectTreeReviver = require('../reviver/object-tree-reviver')

class TestCase {
  constructor (id,
               testCaseConfig,
               objectTreeReviver = Injector.retrive(ObjectTreeReviver.name)) {
    this._id = id
    this._fnCallTree = new FnCallTree()
    this._objectTreeReviver = objectTreeReviver

    this._entryPoint = this._createEntryPoint(testCaseConfig)
    this._entryArgs = require('../../' + testCaseConfig.entry.args)
  }

  get entryPoint () {
    return this._entryPoint
  }

  get entryArgs () {
    return this._entryArgs
  }

  get isFinished () {
    return this._fnCallTree.isFinished
  }

  _createEntryPoint (testCaseConfig) {
    const entryObject = this._objectTreeReviver.revive(testCaseConfig, this._fnCallTree)

    return entryObject.instance[testCaseConfig.entry.name]
  }
}

module.exports = TestCase
