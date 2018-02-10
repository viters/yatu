const Sequelize = require('sequelize')

class DbWrapper {
  constructor() {
    this._adaptee = new Sequelize('postgres', 'postgres', 'admin', {
      host: '192.168.1.3',
      dialect: 'postgres',
      logging: false
    })
  }

  query(query) {
    return this._adaptee.query(query)
  }

  destroy() {
    return this._adaptee.close()
  }
}

module.exports = DbWrapper