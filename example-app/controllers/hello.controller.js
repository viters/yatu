const Injector = require('../injector')

class HelloController {
  constructor (helloService = Injector.retrive('HelloService')) {
    this._helloService = helloService
  }

  async sayHello (req, res) {
    let x = 0
    for (let i = 1; i < 40000000; i++) {
      x = 6123 * 3423 + i
    }

    console.log('hello')

    const name = req.query.name || 'anonymous'

    const dbResponse = await this._helloService.greet(name)

    res.send(dbResponse)
  }
}

module.exports = HelloController
