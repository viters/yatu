const ObjectReviver = require('../src/modules/reviver/object-reviver.js')
const SimpleForeignObject = require('../src/modules/reviver/foreign-object/simple-foreign-object')
const ClassMockWithoutCtorArgs = require('../test/mocks/class-without-ctor-arg.mock.js')

const assert = require('assert')

describe('Reviver TestSuite', function () {
  describe('Object Reviver ', function () {
    let objectReviver = new ObjectReviver(require('./mocks/simple-proxifier.mock.js'))
    it('revive method test', function () {
      // given
      const pathObjectWithoutCtor = '../test/mocks/class-without-ctor-arg.mock.js'
      const pathObjectWithCtor = '../test/mocks/class-with-ctor-arg.mock.js'
      const simpleForeignObject = new SimpleForeignObject(
        'ClassMockWithoutCtorArgs',
        pathObjectWithoutCtor,
        [],
        [],
        new (require(pathObjectWithoutCtor))())
      const simpleForeignObjectWithObject = new SimpleForeignObject(
        'ClassMockWithoutCtorArgs',
        pathObjectWithoutCtor,
        [],
        [],
        require(pathObjectWithoutCtor))
      const simpleForeignObjectWithCheckpoint = new SimpleForeignObject(
        'ClassMockWithoutCtorArgs',
        pathObjectWithoutCtor,
        ['method'],
        [],
        new (require(pathObjectWithoutCtor))())
      const simpleForeignObjectWithArguments = new SimpleForeignObject(
        'ClassWithCtorArg',
        pathObjectWithCtor,
        ['method'],
        ['argument'],
        new (require(pathObjectWithCtor))())

      // when
      const validatedNotObjectTestCase = objectReviver.revive('ClassMockWithoutCtorArgs',
        pathObjectWithoutCtor,
        [],
        'class',
        [])
      const validatedObjectTestCase = objectReviver.revive('ClassMockWithoutCtorArgs',
        pathObjectWithoutCtor,
        [],
        'object',
        [])
      const validatedCheckpointTestCase = objectReviver.revive('ClassMockWithoutCtorArgs',
        pathObjectWithoutCtor,
        ['method'],
        'class',
        [])
      const validatedObjectWithArguments = objectReviver.revive('ClassWithCtorArg',
        pathObjectWithCtor,
        ['method'],
        'class',
        ['argument'])

      // then
      assert.deepEqual(validatedNotObjectTestCase, simpleForeignObject)
      assert.deepEqual(validatedObjectTestCase, simpleForeignObjectWithObject)
      assert.deepEqual(validatedCheckpointTestCase, simpleForeignObjectWithCheckpoint)
      assert.deepEqual(validatedObjectWithArguments, simpleForeignObjectWithArguments)
    })
    })
})
