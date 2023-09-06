const assert = require('assert')

/**
 * PrimoLang interpreter
 */

class Primo {
  eval(expression) {
    if (isNumber(expression)) {
      return expression
    }
    throw 'Uninplemented'
  }
}

function isNumber(expression) {
  return typeof expression === 'number'
}

// Tests:

const primo = new Primo()

assert.strictEqual(primo.eval(1), 1)

console.log('All assertions passed!')
