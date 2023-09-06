const assert = require('assert')

module.exports = (primo) => {
  assert.strictEqual(
    primo.eval([
      'begin',
      ['trem', 'x', 10],
      ['trem', 'y', 20],
      ['+', ['*', 'x', 'y'], 30],
    ]),
    230
  )

  assert.strictEqual(
    primo.eval([
      'begin',
      ['trem', 'x', 10],
      ['begin', ['trem', 'x', 20], 'x'],
      'x',
    ]),
    10
  )

  assert.strictEqual(
    primo.eval([
      'begin',

      ['trem', 'data', 10],

      ['begin', ['set', 'data', 100]],

      'data',
    ]),

    100
  )
}
