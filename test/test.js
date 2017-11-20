const TestFlow = require('../src/test-flow.js')
var assert = require('assert');
testFlow = new TestFlow()
describe('Test Flow', function() {
  describe('Constructor', function() {
    it('Null value of _flow', function() {
      assert.equal(testFlow._flow, null);
    });
    it('Null value _current', function() {
      assert.equal(testFlow._current, null);
    });
    it('Null value of _previous', function() {
      assert.equal(testFlow._previos, null);
    });
  });

  describe('Moving on the Tree', function() {
    var className = { x:"root" };
    var fn = {};
    let rootElem = {className, fn, children: []}
     it('Empty List Descend (creating root node)', function() {
       testFlow.descend(className, fn);
       assert.deepEqual(testFlow._current, rootElem);
       assert.deepEqual(testFlow._flow, rootElem);
       assert.equal(testFlow._flow, testFlow._current);
       assert.deepEqual(testFlow._previos, null);
     });
     it('Descend to 1stLevel', function() {
       var className = {x:"first"};
       let firstElem = {className, fn, children: []};
       rootElem.children.push(firstElem);
       testFlow.descend(className, fn);

       assert.deepEqual(testFlow._current, firstElem);
       assert.deepEqual(testFlow._flow, rootElem);
       assert.deepEqual(testFlow._previos, null);
     });
     it('Immutability of Root Obiects', function() {
       assert.deepEqual(testFlow._flow.className, className);
       assert.deepEqual(testFlow._flow.fn, fn);
     });
     it('Descend to 2ndLevel');
     // function() {
     //   var className = {x:"second"};
     //   let secondElem = {className, fn, children: []};
     //   let tmp = testFlow._current
     //   tmp.children.push(secondElem);
     //   rootElem.children.push(secondElem);
     //   testFlow.descend(className, fn);
     //
     //   assert.deepEqual(testFlow._current, secondElem);
     //   assert.deepEqual(testFlow._flow, rootElem);
     //   // assert.deepEqual(testFlow._previos, null);
     // });
     it('Ascend to 1stLevel');
     it('Descend to 2ndLevel (another branch)');

  });
  // describe('_getEffectiveTime', function() {
  //    it('_getEffectiveTime', function() {
  //      assert.equal(testFlow._getEffectiveTime(this), null);
  //    });
  // });
});
