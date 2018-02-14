const Injector = require('../injector')

class OrderController {
  constructor (orderService = Injector.retrive('OrderService'),
               orderMapperService = Injector.retrive('OrderMapperService')) {
    this._orderService = orderService
    this._orderMapperService = orderMapperService
  }

  async big (req, res) {
    const orderClients = await this._orderService.allOrdersAllClientsCartesian()
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(orderClients))
  }

  async mapped (req, res) {
    const orders = await this._orderService.all()
    const withClients = await this._orderMapperService.appendClients(orders)
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(withClients))
  }
}

module.exports = OrderController
