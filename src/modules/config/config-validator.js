class ConfigValidator {
  atLeastOneTestCase (config) {
    if (config && config.length > 0) {
      return undefined
    } else {
      return {atLeastOneTestCase: false}
    }
  }

  properEntryFn (testCase) {
    if (testCase.entry && testCase.entry.name && testCase.entry.path) {
      return undefined
    } else {
      return {properEntryFn: false}
    }
  }

  hasPath (testCase) {
    if (testCase.path) {
      return undefined
    } else {
      return {hasPath: false}
    }
  }

  lensIsArray (testCase) {
    if (testCase.lens && testCase.lens.length >= 0) {
      return undefined
    } else if (testCase.lens) {
      return {lensIsArray: false}
    } else {
      return undefined
    }
  }
}

module.exports = ConfigValidator
