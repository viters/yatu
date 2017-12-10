module.exports = class SmthService {
  constructor (sequalize) {
    this.sequalize = sequalize
  }

  smth () {
    return this.sequelize.query('SELECT * FROM cukiernia.zamowienia')
  }
}
