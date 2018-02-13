const Injector = require('../injector')

class OrderMapperService {
  constructor (clientService = Injector.retrive('ClientService')) {
    this._clientService = clientService
  }

  async appendClients (orders) {
    const clients = await this._clientService.all()
    return orders.map(o => Object.assign(o, clients.find(c => c.idklienta === o.idklienta)))
  }
}

module.exports = OrderMapperService
