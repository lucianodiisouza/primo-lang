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
      return this.eval(expression[1], env) + this.eval(expression[2], env)
    }

    if (expression[0] === '*') {
      return this.eval(expression[1], env) * this.eval(expression[2], env)
    }

    // Block: sequence of expressions
    if (expression[0] === 'muncado') {
      const blockEnv = new Environment({}, env)
      return this._evalBlock(expression, blockEnv)
    }

    // Variable declaration (trem name luciano)
    if (expression[0] === 'trem') {
      const [_, name, value] = expression
      return env.define(name, this.eval(value))
    }

    // Variable access (name)
    if (isVariableName(expression)) {
      return env.lookup(expression)
    }

    throw `Uninplemented - ${JSON.stringify(expression)}`
  }

  _evalBlock(block, env) {
    let result

    const [_tag, ...expressions] = block

    expressions.forEach((expression) => {
      result = this.eval(expression, env)
    })

    return result
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

function isVariableName(expression) {
  return (
    typeof expression === 'string' && /^[a-zA-Z][a-zA-z0-9]*$/.test(expression)
  )
}
// Tests:

const primo = new Primo(
  new Environment({
    null: null,
    true: true,
    false: false,
    VERSION: '0.1',
  })
)

assert.strictEqual(primo.eval(1), 1)
assert.strictEqual(primo.eval('"hello"'), 'hello')

// Math tests
assert.strictEqual(primo.eval(['+', 1, 5]), 6)
assert.strictEqual(primo.eval(['+', ['+', 3, 2], 5]), 10)
assert.strictEqual(primo.eval(['*', ['*', 3, 2], 5]), 30)

// Variable tests
assert.strictEqual(primo.eval(['trem', 'x', 32]), 32)
assert.strictEqual(primo.eval('x'), 32)

assert.strictEqual(primo.eval(['trem', 'y', 12]), 12)
assert.strictEqual(primo.eval('y'), 12)

assert.strictEqual(primo.eval('VERSION'), '0.1')

assert.strictEqual(primo.eval(['trem', 'isUser', 'true']), true)

assert.strictEqual(primo.eval(['trem', 'z', ['*', 2, 2]]), 4)
assert.strictEqual(primo.eval('z'), 4)

// blocks
assert.strictEqual(
  primo.eval([
    'muncado',
    ['trem', 'x', 10],
    ['trem', 'y', 20],
    ['+', ['*', 'x', 'y'], 30],
  ]),
  230
)

assert.strictEqual(
  primo.eval(
    ['muncado', ['trem', 'x', 10], ['muncado', ['trem', 'x', 20], 'x'], 'x'],
    'x'
  ),
  10
)

console.log('All assertions passed!')

/**
 * mineirês naming dictionary
 * trem = variável
 * muncado = bloco
 */
