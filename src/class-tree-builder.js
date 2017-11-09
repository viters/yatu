const classBuilderFactory = require('./class-builder-factory')

module.exports = class ClassTreeBuilder {
  constructor (resultHolder) {
    this._resultHolder = resultHolder
  }

  build (configClassTreeRoot) {
    this._classBuilder = classBuilderFactory(
      this._resultHolder.createCase().flow
    )
    return this._buildDependenciesForRoot(configClassTreeRoot)
  }

  _buildDependenciesForRoot (configClassTreeRoot) {
    return this._classBuilder(
      configClassTreeRoot.class,
      configClassTreeRoot.path,
      configClassTreeRoot.fn.map(x => x.name),
      this._buildDependencies(configClassTreeRoot.lens)
    ).build()
  }

  _buildDependencies (lens) {
    if (!lens || lens.length === 0) {
      return []
    }

    return lens.map(x =>
      this._classBuilder(
        x.class,
        x.path,
        x.fn.map(x => x.name),
        this._buildDependencies(x.lens)
      ).build()
    )
  }
}
