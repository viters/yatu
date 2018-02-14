const ConfigValidator = require('../src/modules/config/config-validator.js')
const ConfigReader = require('../src/modules/config/config-reader.js')
const PathConverter = require('../src/modules/config/path-converter.js')
const assert = require('assert')

describe('Config TestSuite', function () {
  describe('Config Validator ', function () {
    let configValidator = new ConfigValidator()

    it('atLeastOneTestCase method test', function () {
      // given
      const emptyArrayTestCase = []
      const arrayTestCase = ['any']

      const errorResult = {atLeastOneTestCase: false}
      const successResult = undefined

      // when
      const validatedEmptyTestCase = configValidator.atLeastOneTestCase()
      const validatedEmptyArrayTestCase = configValidator.atLeastOneTestCase(emptyArrayTestCase)
      const validatedArrayTestCase = configValidator.atLeastOneTestCase(arrayTestCase)

      // then
      assert.deepEqual(validatedEmptyTestCase, errorResult)
      assert.deepEqual(validatedEmptyArrayTestCase, errorResult)
      assert.deepEqual(validatedArrayTestCase, successResult)
      assert.deepEqual(configValidator.atLeastOneTestCase(arrayTestCase), configValidator.atLeastOneTestCase(arrayTestCase))
    })

    it('properEntryFn method test', function () {
      // given
      const emptyTestCase = {entry: {}}
      const testCaseWithoutName = {entry: {path: 'any'}}
      const testCaseWithoutPath = {entry: {name: 'any'}}
      const properTestCase = {entry: {name: 'any', path: 'any'}}

      const errorResult = {properEntryFn: false}
      const successResult = undefined

      // when
      const validatedEmptyTestCase = configValidator.properEntryFn(emptyTestCase)
      const validatedtestCaseWithoutName = configValidator.properEntryFn(testCaseWithoutName)
      const validatedtestCaseWithoutPath = configValidator.properEntryFn(testCaseWithoutPath)
      const validatedproperTestCase = configValidator.properEntryFn(properTestCase)

      // then
      assert.deepEqual(validatedEmptyTestCase, errorResult)
      assert.deepEqual(validatedtestCaseWithoutName, errorResult)
      assert.deepEqual(validatedtestCaseWithoutPath, errorResult)
      assert.equal(validatedproperTestCase, successResult)
    })

    it('hasPath method test', function () {
      // given
      const emptyTestCase = {entry: {}}
      const properTestCase = {path: 'any'}

      const errorResult = {hasPath: false}
      const successResult = undefined

      // when
      const validatedEmptyTestCase = configValidator.hasPath(emptyTestCase)
      const validatedProperTestCase = configValidator.hasPath(properTestCase)

      // then
      assert.deepEqual(validatedEmptyTestCase, errorResult)
      assert.deepEqual(validatedProperTestCase, successResult)
    })

    it('lensIsArray method test', function () {
      // given
      const emptyArrayTestCase = {lens: []}
      const arrayTestCase = {lens: ['any']}
      const undefinedTestCase = {lens: undefined}

      // const errorResult = {lensIsArray: false}
      const successResult = undefined

      // when
      const validatedEmptyArrayTestCase = configValidator.lensIsArray(emptyArrayTestCase)
      const validatedArrayTestCase = configValidator.lensIsArray(arrayTestCase)
      const validatedUndefinedTestCase = configValidator.lensIsArray(undefinedTestCase)

      // then
      assert.deepEqual(validatedEmptyArrayTestCase, successResult)
      assert.deepEqual(validatedArrayTestCase, successResult)
      assert.deepEqual(validatedUndefinedTestCase, successResult)
    })
  })

  describe('Config Reader ', function () {
    let configReader = new ConfigReader()
  // given
  // when
  // then
  })

  describe('Path Converter ', function () {
    let pathConverter = new PathConverter()

    it('convertStartFnArgsPath method test', function () {
      // given
      // when
      // then
    })
  })
})
