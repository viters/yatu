const ObjectTreeReviver = require('../src/modules/reviver/object-tree-reviver.js')
const ObjectReviver = require('../src/modules/reviver/object-reviver.js')
const SimpleForeignObject = require('../src/modules/reviver/foreign-object/simple-foreign-object')
const assert = require('assert')

describe('Reviver TestSuite', function () {
  describe('Object Tree Reviver ', function () {
    let objectTreeReviver = new ObjectTreeReviver('TestName')

    it('_reviveDependencies method test', function() {
      // given
      const emptyTestCase = null
      const emptyArrayTestCase = []

      const errorResult = []

      // when
      const validatedEmptyTestCase = objectTreeReviver._reviveDependencies(emptyTestCase)
      const validatedEmptyArrayTestCase = objectTreeReviver._reviveDependencies(emptyArrayTestCase)

      // then
      assert.deepEqual(validatedEmptyTestCase, errorResult)
      assert.deepEqual(validatedEmptyArrayTestCase, errorResult)
    })
  })

  describe('Object Reviver ', function () {
    let objectReviver = new ObjectReviver('TestName')
    
    it('revive method test', function() {
      //given
      const emptyCheckpointsTestCase = null
      const emptyCheckpointsArrayTestCase = []
      const path = '../test/mocks/class-without-ctor-arg.mock.js'
      const simpleForeignObject = new SimpleForeignObject(
        'ClassMockWithoutCtorArgs',
        path,
        [],
        [],
        new (require(path))())

      const errorResult = simpleForeignObject

      // when
      const validatedEmptyTestCase = objectReviver.revive('ClassMockWithoutCtorArgs',
        path,
        emptyCheckpointsArrayTestCase,
        'notMock',
        [],
        undefined)

      // then
      assert.deepEqual(validatedEmptyTestCase, errorResult)
      // assert.deepEqual(validatedEmptyArrayTestCase, errorResult)
    })
    })
})
