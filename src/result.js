const TestFlow = require('./test-flow'),
  consoleHelpers = require('./console-helpers');

module.exports = class Result {
  constructor() {
    this._id = 1;
    this._history = [];
  }

  get history() {
    return this._history;
  }

  createCase() {
    const testCase = {
      id: this._id++,
      flow: new TestFlow(),
    };

    this._history.push(testCase);
    return testCase;
  }

  print() {
    this._history.map(x => x.flow).forEach(x => x.print());
  }
};