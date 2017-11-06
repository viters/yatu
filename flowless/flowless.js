const figlet = require('figlet');

const tests = [
  require('../test-app/tests/hello.test'),
];

console.log(figlet.textSync('Flowless', () => null));
console.log(`Welcome to Flowless v0.0.1\nYour tests will be performed now\n\n`);

const fgGreen = '\x1b[32m',
      fgCyan = '\x1b[36m',
      fgYellow = '\x1b[33m',
      reset = '\x1b[0m';

const proxy = (fn, fnName, ctxName) => {
  return new Proxy(fn, {
    apply: (target, receiver, args) => {
      console.log(`-+ ${fgYellow}${ctxName}${reset}:${fgCyan}${fnName}()${reset}`);
      const startDate = new Date();
      target(...args);
      const endDate = new Date();
      const compTime = endDate.getTime() - startDate.getTime();
      console.log(`:: ${fgGreen}${compTime}${reset}ms`);
    }
  })
};

tests.map(x => x())
  .reduce((p, c) => p.concat(c), [])
  .map(x => Object.assign(x, {fn: proxy(x.fn.bind(x.ctx), x.fn.name, x.ctx.constructor.name)}))
  .forEach(x => x.fn(...x.args));

console.log(`\n\nAll tests done`);