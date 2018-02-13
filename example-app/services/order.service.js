const Injector = require('../injector')

class OrderService {
  constructor (sequelize = Injector.retrive('Sequelize')) {
    this.sequelize = sequelize
  }

  async all () {
    return new Promise((resolve, reject) =>
      this.sequelize
        .query('SELECT * FROM cukiernia.zamowienia')
        .then((res) => resolve(res[0])).catch((e) => reject(e))
    )
  }

  async allOrdersAllClientsCartesian () {
    return new Promise((resolve, reject) =>
      this.sequelize
        .query('SELECT * FROM cukiernia.zamowienia, cukiernia.klienci')
        .then((res) => resolve(res[0])).catch((e) => reject(e))
    )
  }
}

module.exports = OrderService