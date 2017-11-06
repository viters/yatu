const HelloController = require('./controllers/hello.controller');
const HelloService = require('./services/hello.service');

const helloController = new HelloController(new HelloService);

const routes = [
  {method: 'get', path: '/', fn: helloController.sayHello.bind(helloController)},
];

module.exports = routes;