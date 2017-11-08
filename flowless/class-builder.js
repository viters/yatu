const consoleHelpers = require('./console-helpers');

module.exports = class ClassBuilder {
  constructor(className, path, fnsToProxy, ctorArgs, depth) {
    this._name = className;
    this._path = path;
    this._fnsToProxy = fnsToProxy;
    this._ctorArgs = ctorArgs;
    this._depth = depth;
    this._ident = this._prepareIdent();
  }

  build() {
    const classPrototype = require(this._path);
    const classObject = new classPrototype(...this._ctorArgs);

    if (!this._fnsToProxy || this._fnsToProxy.length === 0) {
      return classObject;
    }

    return this._proxifyObj(classObject);
  }

  _proxifyObj(obj) {
    return new Proxy(obj, {
      get: (target, propKey, receiver) => {
        const origMethod = target[propKey];

        if (!~this._fnsToProxy.indexOf(propKey)) {
          return origMethod;
        }

        return (...args) => {
          console.log(`${this._ident}-+ ${consoleHelpers.fgYellow}${this._name}${consoleHelpers.reset}:${consoleHelpers.fgCyan}${propKey}()${consoleHelpers.reset}`);
          try {
            const startDate = new Date();
            origMethod.apply(obj, args);
            const endDate = new Date();
            const compTime = endDate.getTime() - startDate.getTime();
            console.log(`${this._ident}:: ${consoleHelpers.fgGreen}${compTime}${consoleHelpers.reset}ms`);
          } catch (e) {
            console.log(`${this._ident}${consoleHelpers.bgRed}!! ${e}${consoleHelpers.reset}`);
          }
        }
      }
    });
  }

  _prepareIdent() {
    const space = '  ';
    let result = '';

    for (let i = 0; i < this._depth; i++) {
      result += space;
    }

    return result;
  }
};
