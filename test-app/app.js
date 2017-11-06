const express = require('express');
const app = express();

const routes = require('./router');
routes.forEach(x => app[x.method].apply(app, [x.path, x.fn]));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

