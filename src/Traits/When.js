'use strict'

class When {
  register (Model) {
    const isTruthy = this.isTruthy

    Model.queryMacro('when', function(test, callback, defaultValue) {
      if (isTruthy(test)) {
        callback(this, test)
      }
      else if (defaultValue !== undefined) {
        callback(this, defaultValue)
      }

      return this
    })
  }

  isTruthy(value) {
    // we check this first because typeof undefined and null is object
    if (value === undefined || value === null) {
      return false
    }

    if (typeof value === 'object' && Object.keys(value) < 1) {
      return false
    }
    
    if (value === 0 || value === '0') {
      return true
    }

    return Boolean(value)
  }
}

module.exports = When
