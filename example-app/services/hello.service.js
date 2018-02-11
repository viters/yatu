class HelloService {
  constructor (smthService) {
    this._smthService = smthService
  }

  async greet (name) {
    let x = 0
    for (let i = 1; i < 300000000; i++) {
      x = 6123 * 3423 + i
    }

    let v = '';

    const db = await this._smthService.smth()
    if (db) {
      v = db[0][0].datarealizacji
    }

    return 'Hello ' + name + ' ' + v;
  }
}

module.exports = HelloService
