const assert = require('assert')
const primoParser = require('../parser/primoParser')

function test(primo, code, expected) {
  const expression = primoParser.parse(code)
  assert.strictEqual(primo.eval(expression), expected)
}

module.exports = {
  test,
}
