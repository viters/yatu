module.exports = class TestFlow {
  constructor() {
    this._workingFlow = [];
    this._finishedFlow = [];
  }

  descend(className, fn) {
    this._workingFlow.push({className, fn});
  }

  ascend(status, time, error = null) {
    const work = this._workingFlow.pop();
    this._finishedFlow.push({
      className: work.className,
      fn: work.fn,
      status,
      time,
      error,
    });
  }

  print() {
    this._finishedFlow.forEach(x => console.log(`${x.className}:${x.fn} = ${x.time}ms`));
  }
};