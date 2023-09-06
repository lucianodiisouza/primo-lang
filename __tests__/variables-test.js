const assert = require('assert')

module.exports = (primo) => {
  assert.strictEqual(primo.eval(['trem', 'x', 32]), 32)
  assert.strictEqual(primo.eval('x'), 32)
  assert.strictEqual(primo.eval(['trem', 'y', 12]), 12)
  assert.strictEqual(primo.eval('y'), 12)
  assert.strictEqual(primo.eval('VERSION'), '0.1')
  assert.strictEqual(primo.eval(['trem', 'isUser', 'true']), true)
  assert.strictEqual(primo.eval(['trem', 'z', ['*', 2, 2]]), 4)
  assert.strictEqual(primo.eval('z'), 4)
}
