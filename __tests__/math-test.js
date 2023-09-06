const assert = require('assert')

module.exports = (primo) => {
  assert.strictEqual(primo.eval(['+', 1, 5]), 6)
  assert.strictEqual(primo.eval(['+', ['+', 3, 2], 5]), 10)
  assert.strictEqual(primo.eval(['*', ['*', 3, 2], 5]), 30)
}
