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

    // Comparison operations (wip)
    if (expression[0] === '>') {
      return this.eval(expression[1], env) > this.eval(expression[2], env)
    }

    if (expression[0] === '>=') {
      return this.eval(expression[1], env) >= this.eval(expression[2], env)
    }

    if (expression[0] === '<') {
      return this.eval(expression[1], env) < this.eval(expression[2], env)
    }

    if (expression[0] === '<=') {
      return this.eval(expression[1], env) <= this.eval(expression[2], env)
    }

    if (expression[0] === '=') {
      return this.eval(expression[1], env) = this.eval(expression[2], env)
    }

    // Block: sequence of expressions
    if (expression[0] === 'dale') {
      const blockEnv = new Environment({}, env)
      return this._evalBlock(expression, blockEnv)
    }

    // Variable declaration (trem name luciano)
    if (expression[0] === 'trem') {
      const [_, name, value] = expression
      return env.define(name, this.eval(value))
    }

    // Variable update (ponha name primo)
    if (expression[0] === 'ponha') {
      const [_, name, value] = expression
      return env.assign(name, this.eval(value, env))
    }

    // Variable access (name)
    if (isVariableName(expression)) {
      return env.lookup(expression)
    }

    // IF (SE) Expression
    if (expression[0] === 'se') {
      const [_tag, condition, consequent, alternate] = expression

      if (this.eval(condition, env)) {
        return this.eval(consequent, env)
      }

      return this.eval(alternate, env)
    }

    // WHILE (Enquanto) Expression
    if (expression[0] === 'enquanto') {
      const [_tag, condition, body] = expression

      let result;

      while(this.eval(condition, env)) {
        result = this.eval(body, env)
      }

      return result
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

module.exports = Primo
