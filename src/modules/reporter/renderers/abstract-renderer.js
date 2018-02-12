class AbstractRenderer {
  constructor () {
    if (this.constructor === AbstractRenderer) {
      throw new TypeError('Abstract class AbstractRenderer cannot be instantiated directly.')
    }
  }

  render (fnCallTreeRoot) {
    return new Error('Method not implemented!')
  }
}

module.exports = AbstractRenderer