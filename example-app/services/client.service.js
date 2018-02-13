const Injector = require('../injector')

class ClientService {
  constructor (sequelize = Injector.retrive('Sequelize')) {
    this._sequelize = sequelize
  }

  async all () {
    return new Promise((resolve, reject) =>
      this._sequelize
        .query('SELECT * FROM cukiernia.klienci')
        .then((res) => resolve(res[0])).catch((e) => reject(e))
    )
  }
}

module.exports = ClientService
