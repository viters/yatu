const figlet = require('figlet'),
  configReader = require('./config-reader'),
  Result = require('./result'),
  ClassTreeBuilder = require('./class-tree-builder');

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
    this._createTestCases();

    this._classTree[0].sayHello({query: {name: 'test'}}, {send: () => null});

    this._displayGoodbyeMessage();
  }

  _displayHelloMessage() {
    console.log(figlet.textSync('yatu', () => null));
    console.log(`Welcome to yatu v0.1.1\nYour tests will be performed now\n\n`);
  }

  _readConfig() {
    this._config = configReader(this._pathToTestsFile);
  }

  _createTestCases() {
    this._classTree =
      this._config.map(x => this._classTreeBuilder.build(x));
  }

  _displayGoodbyeMessage() {
    console.log('\n\nGoodbye');
  }
}

new Yatu();