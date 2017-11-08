const ClassBuilder = require('./class-builder');

const classBuilderFactory = (testFlow) => ((className, path, fnsToProxy, ctorArgs) =>
  new ClassBuilder(className, path, fnsToProxy, ctorArgs, testFlow));

module.exports = classBuilderFactory;
