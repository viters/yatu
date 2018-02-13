class HelloService {
  calculate (num1, num2) {
    let x = 0
    for (let i = 1; i < 300000000; i++) {
      x = num1 * num2 + i
    }

    return x
  }
}

module.exports = HelloService
