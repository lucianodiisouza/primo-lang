const assert = require('assert')

module.exports = (primo) => {
  assert.strictEqual(primo.eval(1), 1)
  assert.strictEqual(primo.eval('"hello"'), 'hello')
}
