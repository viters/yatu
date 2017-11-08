const ClassBuilder = require('./class-builder');

module.exports = class ClassTreeFactory {
  constructor(configClassTree, pathToProject) {
    this._configClassTree = configClassTree;
    this._pathToProject = pathToProject;
  }

  build() {
    return this._buildDependencies(this._configClassTree);
  }

  _buildDependencies(lens) {
    if (!lens || lens.length === 0) {
      return [];
    }

    return lens.map(x =>
      (new ClassBuilder(x.class, this._convertPath(x.path), x.fn, this._buildDependencies(x.lens))).build()
    );
  }

  _convertPath(path) {
    return this._pathToProject + path.slice(2, path.length);
  }
};