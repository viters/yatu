const Injector = require('../injector')

class HelloController {
  constructor (helloService = Injector.retrive('HelloService')) {
    this._helloService = helloService
  }

  sayHello (req, res) {
    const name = req.query.name || 'anonymous'
    const result = this._helloService.calculate(6123, 3423)
    const message = `
    <h1>Hello ${name}!</h1> 
    <p>Result of <strong>300000000</strong> iterations of 
    <code>x = num1 * num2 + i</code> is <strong>${result}</strong>.</p>
    `

    res.send(message)
  }
}

module.exports = HelloController
