const HelloController = require('./controllers/hello.controller')
const HelloService = require('./services/hello.service')
const SmthService = require('./services/smth.service')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('postgres', 'postgres', 'admin', {
  dialect: 'postgres'
})

sequelize.query('EXPLAIN ANALYZE SELECT * FROM cukiernia.zamowienia').then(x => console.log(x[0][2]))

const helloController = new HelloController(new HelloService(new SmthService(sequelize)))

const routes = [
  {method: 'get', path: '/', fn: helloController.sayHello.bind(helloController)}
]

module.exports = routes