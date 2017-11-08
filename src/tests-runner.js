module.exports = class TestsRunner {
  constructor (config, classTree) {
    this._config = config;
    this._classTree = classTree;
  }

  run() {
    const consoleLog = console.log,
      consoleError = console.error;

    console.log = (..._) => null;
    console.error = (e) => {throw new Error(e)};

    for (let i = 0; i < this._config.length; i++) {
      const fnToTestList = this._config[i].fn;
      fnToTestList.forEach(x => this._classTree[i][x.name](...(require(x.args))));
    }

    console.log = consoleLog;
    console.error = consoleError;
  }
};