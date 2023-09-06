const assert = require('assert')
const Environment = require('./Environment')

/**
 * PrimoLang interpreter
 */

class Primo {
  /**
   * Creates a Primo instante with global environment
   */
  constructor(global = new Environment()) {
    this.global = global
  }

  // Expressions evaluation
  eval(expression, env = this.global) {
    if (isNumber(expression)) {
      return expression
    }

    if (isString(expression)) {
      return expression.slice(1, -1)
    }

    // Math operations (wip)
    if (expression[0] === '+') {
      return this.eval(expression[1]) + this.eval(expression[2])
    }

    if (expression[0] === '*') {
      return this.eval(expression[1]) * this.eval(expression[2])
    }

    // Variable declaration
    if (expression[0] === 'trem') {
      const [_, name, value] = expression
      return env.define(name, value)
    }

    throw `Uninplemented - ${JSON.stringify(expression)}`
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

// Variable tests
assert.strictEqual(primo.eval(['trem', 'x', 32]), 32)

console.log('All assertions passed!')
