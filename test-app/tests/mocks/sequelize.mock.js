const Sequelize = require('sequelize')

module.exports = new Sequelize('postgres', 'postgres', 'admin', {
  host: '192.168.1.3',
  dialect: 'postgres',
  logging: false
})