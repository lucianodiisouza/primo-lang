const assert = require('assert')

/**
 * PrimoLang interpreter
 */

class Primo {
  eval(expression) {
    if (isNumber(expression)) {
      return expression
    }

    if (isString(expression)) {
      return expression.slice(1, -1)
    }

    if (expression[0] === '+') {
      return this.eval(expression[1]) + this.eval(expression[2])
    }

    if (expression[0] === '*') {
      return this.eval(expression[1]) * this.eval(expression[2])
    }

    throw 'Uninplemented'
  }
}

function isNumber(expression) {
  return typeof expression === 'number'
}

function isString(expression) {
  return (
    typeof expression === 'string' &&
    expression[0] === '"' &&
    expression.slice(-1) === '"'
  )
}

// Tests:

const primo = new Primo()

assert.strictEqual(primo.eval(1), 1)
assert.strictEqual(primo.eval('"hello"'), 'hello')

// Math tests
assert.strictEqual(primo.eval(['+', 1, 5]), 6)
assert.strictEqual(primo.eval(['+', ['+', 3, 2], 5]), 10)
assert.strictEqual(primo.eval(['*', ['*', 3, 2], 5]), 30)

console.log('All assertions passed!')
