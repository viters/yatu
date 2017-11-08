const figlet = require('figlet'),
  configReader = require('./config-reader'),
  Result = require('./result'),
  ClassTreeBuilder = require('./class-tree-builder'),
  TestsRunner = require('./tests-runner');

class Yatu {
  constructor() {
    this._pathToTestsFile = '../test-app/tests.json';
    this._pathToProject = '../test-app/';
    this._config = [];
    this._classTree = [];
    this._result = new Result();
    this._classTreeBuilder = new ClassTreeBuilder(
      this._result,
      this._pathToProject
    );

    this._displayHelloMessage();
    this._readConfig();
    this._createClassTree();

    this._testsRunner = new TestsRunner(this._config, this._classTree);
    this._testsRunner.run();

    this._result.print();

    this._displayGoodbyeMessage();
  }

  _displayHelloMessage() {
    console.log(figlet.textSync('yatu', () => null));
    console.log(`Welcome to yatu v0.1.1\nYour tests will be performed now\n\n`);
  }

  _readConfig() {
    this._config = configReader(this._pathToTestsFile);
    this._config.forEach(x => this._convertPathsInTestCase(x));
  }

  _convertPathsInTestCase(testCase) {
    if (testCase.path) {
      testCase.path = this._convertPath(testCase.path);
    }

    if (testCase.fn) {
      testCase.fn.forEach(x => x.args ? x.args = this._convertPath(x.args) : null);
    }

    if (testCase.lens) {
      testCase.lens.forEach(x => this._convertPathsInTestCase(x));
    }
  }

  _convertPath(path) {
    return this._pathToProject + path.slice(2, path.length);
  }

  _createClassTree() {
    this._classTree =
      this._config.map(x => this._classTreeBuilder.build(x));
  }

  _displayGoodbyeMessage() {
    console.log('\n\nGoodbye');
  }
}

new Yatu();