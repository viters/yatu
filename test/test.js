const TestFlow = require('../src/test-flow.js')
var assert = require('assert')
testFlow = new TestFlow()


describe('Test Flow', () => {
  describe('Constructor', () => {
    it('Null value of _flow', () => {
      assert.equal(testFlow._flow, null)
    })
    it('Null value _current', () => {
      assert.equal(testFlow._current, null)
    })
    it('Null value of _previous', () => {
      assert.equal(testFlow._previos, null)
    })
  })

  describe('Moving on the Tree', () => {
    var className = { x:"root" }
    var fn = {}
    let rootElem = {className, fn, children: []}
     it('Empty List Descend (creating root node)', () => {
       testFlow.descend(className, fn)
       assert.deepEqual(testFlow._current, rootElem)
       assert.deepEqual(testFlow._flow, rootElem)
       assert.equal(testFlow._flow, testFlow._current)
       assert.deepEqual(testFlow._previos, null)
     })
     it('Descend to 1stLevel', () => {
       var className = {x:"first"}
       let firstElem = {className, fn, children: []}
       let tmp = testFlow._current
       tmp.children.push(firstElem)
       testFlow.descend(className, fn)

       assert.deepEqual(testFlow._current, firstElem)
       assert.deepEqual(testFlow._flow, tmp)
       assert.deepEqual(testFlow._previos, null)
     })
     it('Immutability of Root Obiects', () => {
       assert.deepEqual(testFlow._flow.className, className)
       assert.deepEqual(testFlow._flow.fn, fn)
     })
     it('Descend to 2ndLevel', () => {
       var className = {x:"second"}
       let secondElem = {className, fn, children: []}
       let tmp = testFlow._current
       tmp.children.push(secondElem)
       //testFlow.children.push(secondElem)
       rootElem.children.push(secondElem)
       testFlow.descend(className, fn)

       assert.deepEqual(testFlow._current, secondElem)
       //assert.deepEqual(testFlow._flow, rootElem)
       assert.deepEqual(testFlow._previos, null)
     })
     it('Ascend to 1stLevel', () => {

       testFlow.ascend("a","b", null)
       // assert.equal(TestFlow._current.status, "a")
     })
     it('Descend to 2ndLevel (another branch)')

  })
  describe('getEffectiveTime', function() {
     it('Standard Values', function() {
       // given
       let x = Object.freeze({time: 1000, children: [{time: 500}, {time: 200}]})
       let y = Object.freeze({time: 500, children: [{time:500}, {time:0}]})
       // when
       let effectiveTime1 = testFlow.getEffectiveTime(x)
       let effectiveTime2 = testFlow.getEffectiveTime(y)
       // then
       assert.equal(effectiveTime1, 300)
       assert.equal(effectiveTime2, 0)
     })
     it('Negative Values', function() {
       //given
       let negValue = Object.freeze({time: 0, children: [{time: 500}]})
       //when
       let effectiveTime1 = testFlow.getEffectiveTime(negValue)
       //then
       assert.equal(effectiveTime1, -500)
     })

  })
})
