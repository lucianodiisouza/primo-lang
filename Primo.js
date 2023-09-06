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
    if (expression[0] === 'begin') {
      const blockEnv = new Environment({}, env)
      return this._evalBlock(expression, blockEnv)
    }

    // Variable declaration (trem name luciano)
    if (expression[0] === 'trem') {
      const [_, name, value] = expression
      return env.define(name, this.eval(value))
    }

    // Variable update (set name primo)
    if (expression[0] === 'set') {
      const [_, name, value] = expression
      return env.assign(name, this.eval(value, env))
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
