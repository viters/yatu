class HelloController {
  constructor(helloService) {
    this._helloService = helloService;
  }

  sayHello(req, res) {
    setTimeout(() => {
      let x = 0;
      for (let i = 1; i < 100000000; i++) {
        x = 6123 * 3423 + i;
      }
    }, 1000);

    const name = req.query.name || 'anonymous';
    res.send(this._helloService.greet(name));
  }
}

module.exports = HelloController;