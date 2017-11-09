const fs = require('fs')

const configReader = (src) => JSON.parse(fs.readFileSync(src, 'utf-8'))

module.exports = configReader
