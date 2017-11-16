module.exports = class SmthService {
  smth() {
    let x = 0;
    for (let i = 1; i < 300000000; i++) {
      x = 6123 * 3423 + i;
    }
    return x;
  }
}
