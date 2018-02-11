const FnCallTree = require('../src/modules/test-suite/fn-call-tree/fn-call-tree.js')
const SyncFnProxyStrategy = require('../src/modules/reviver/object-proxifier/fn-proxy-strategy/sync-fn-proxy-strategy.js')
const FnCallStatus = require('../src/modules/test-suite/fn-call-tree/fn-call-status.js')
const assert = require('assert')

describe('Strategy TestSuite', function () {
  describe('SyncStrategy TestCase', function () {
    // given
    const fnCallTree = new FnCallTree()
    const settings = {
      className: 'TestClass',
      fnName: 'TestFunction',
      origMethod: a => a,
      fnCallTree: fnCallTree,
      instance: {}
    }
    const syncFnProxyStrategy = new SyncFnProxyStrategy(settings)
    const fun = syncFnProxyStrategy.execute()

    // when
    fun(1)
    // then
    it('Node tests', function () {
      assert.notEqual(fnCallTree.root.time, null)
      assert.equal(fnCallTree.root.status, FnCallStatus.COMPLETE)
      assert.deepEqual(fnCallTree.root.children, [])
    })
    it('Tree is finished', async function () {
      //when
      const finished = await fnCallTree.isFinished
      //then
      assert.deepEqual(finished, fnCallTree.root)
    })
  })
})
