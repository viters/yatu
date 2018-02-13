const express = require('express')
const app = express()
const Injector = require('./injector')

const HelloController = require('./controllers/hello.controller')
const OrderController = require('./controllers/order.controller')
const HelloService = require('./services/hello.service')
const OrderService = require('./services/order.service')
const OrderMapperService = require('./services/order-mapper.service')
const ClientService = require('./services/client.service')
const Sequelize = require('sequelize')

Injector.perpetuate(new Sequelize('postgres', 'postgres', 'admin', {
  host: '192.168.1.3',
  dialect: 'postgres',
  operatorsAliases: false
}))
Injector.perpetuate(new ClientService())
Injector.perpetuate(new OrderService())
Injector.perpetuate(new OrderMapperService())
Injector.perpetuate(new HelloService())
Injector.perpetuate(new OrderController())
Injector.perpetuate(new HelloController())

const routes = require('./router')
routes.forEach(x => app[x.method].apply(app, [x.path, x.fn]))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

