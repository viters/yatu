const HelloController = require('../controllers/hello.controller');
const HelloService = require('../services/hello.service');

module.exports = () => {
  const helloController = new HelloController(new HelloService);
  const req = {
    query: {name: 'Tomasz'}
  };
  const res = {
    send: (_) => null,
  };

  return [
    {
      fn: helloController.sayHello,
      args: [req, res],
      ctx: helloController,
    }
  ];
};