const express = require('express')
const app = express()
const Injector = require('./injector')

const HelloController = require('./controllers/hello.controller')
const HelloService = require('./services/hello.service')
const SmthService = require('./services/smth.service')
const Sequelize = require('sequelize')

Injector.perpetuate(new Sequelize('postgres', 'postgres', 'admin', {
  host: '192.168.1.3',
  dialect: 'postgres',
  operatorsAliases: false
}))
Injector.perpetuate(new SmthService())
Injector.perpetuate(new HelloService())
Injector.perpetuate(new HelloController())

const routes = require('./router')
routes.forEach(x => app[x.method].apply(app, [x.path, x.fn]))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

