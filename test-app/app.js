const express = require('express');
const app = express();

const HelloController = require('./controllers/hello-controller');

app.get('/', (new HelloController()).printHello);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

