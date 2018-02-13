const Injector = require('../injector')

class SmthService {
  constructor (sequelize = Injector.retrive('Sequelize')) {
    this.sequelize = sequelize
  }

  async smth () {
    return new Promise((resolve, reject) => {
      this.sequelize.query('SELECT * FROM cukiernia.zamowienia').then(resolve)
    })
  }
}


module.exports = SmthService