const figlet = require('figlet'),
  configReader = require('./config-reader'),
  ClassTreeFactory = require('./class-tree-factory');

class Flowless {
  constructor() {
    this._pathToTestsFile = '../test-app/tests.json';
    this._pathToProject = '../test-app/';
    this._config = [];
    this._testCases = [];

    this._displayHelloMessage();
    this._readConfig();
    this._createTestCases();

    this._testCases[0].sayHello({query: {name: 'test'}}, {send: () => null});

    this._displayGoodbyeMessage();
  }

  _displayHelloMessage() {
    console.log(figlet.textSync('Flowless', () => null));
    console.log(`Welcome to Flowless v0.1.0\nYour tests will be performed now\n\n`);
  }

  _readConfig() {
    this._config = configReader(this._pathToTestsFile);
  }

  _createTestCases() {
    this._testCases =
      this._config.map(x => (new ClassTreeFactory([x], this._pathToProject)).build())
        .reduce(x => (prev, curr) => curr);
  }

  _displayGoodbyeMessage() {
    console.log('\n\nGoodbye');
  }
}

new Flowless();