class ClassWithCtorArg {
  constructor (arg1) {
    this.arg1 = arg1
  }

  method () {
    console.log('ClassMockWithoutCtorArgs method. Args: ' + this.arg1)
  }
}

module.exports = ClassWithCtorArg