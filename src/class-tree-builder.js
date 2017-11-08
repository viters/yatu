const ClassBuilder = require('./class-builder'),
  classBuilderFactory = require('./class-builder-factory');

module.exports = class ClassTreeBuilder {
  constructor(resultHolder, pathToProject) {
    this._resultHolder = resultHolder;
    this._pathToProject = pathToProject;
  }

  build(configClassTreeRoot) {
    this._classBuilder = classBuilderFactory(
      this._resultHolder.createCase().flow
    );
    return this._buildDependenciesForRoot(configClassTreeRoot);
  }

  _buildDependenciesForRoot(configClassTreeRoot) {
    return this._classBuilder(
      configClassTreeRoot.class,
      this._convertPath(configClassTreeRoot.path),
      configClassTreeRoot.fn,
      this._buildDependencies(configClassTreeRoot.lens)
    ).build();
  }

  _buildDependencies(lens) {
    if (!lens || lens.length === 0) {
      return [];
    }

    return lens.map(x =>
      this._classBuilder(
        x.class,
        this._convertPath(x.path),
        x.fn,
        this._buildDependencies(x.lens)
      ).build()
    );
  }

  _convertPath(path) {
    return this._pathToProject + path.slice(2, path.length);
  }
};