const figlet = require('figlet')
const Yatu = require('./yatu')

console.log(figlet.textSync('yatu', () => null))
console.log(`Welcome to yatu v1.4.0\nYour tests will be performed now\n\n`)

const yatu = new Yatu()
yatu.bootstrap()
