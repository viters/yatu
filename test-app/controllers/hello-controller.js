class HelloController {
  printHello(req, res) {
    console.log('siemanko');
    res.send('Hello');
  }
}

module.exports = HelloController;