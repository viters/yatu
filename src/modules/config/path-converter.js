class PathConverter {
  constructor (pathToProject) {
    this._pathToProject = pathToProject
  }

  convertPathsInTestCase (testCase) {
    return Object.assign(testCase, {
      path: this._convertPath(testCase.path),
      entry: this._convertStartFnArgsPath(testCase.entry),
      lens: this._convertDeeperIntoLens(testCase.lens)
    })
  }

  _convertPath (path) {
    return '../' + this._pathToProject + path
  }

  _convertStartFnArgsPath (entryFn) {
    return entryFn && entryFn.args ? Object.assign(entryFn, {args: this._convertPath(entryFn.args)}) : entryFn
  }

  _convertDeeperIntoLens (lens) {
    return lens ? lens.map(x => this.convertPathsInTestCase(x)) : lens
  }
}

module.exports = PathConverter
