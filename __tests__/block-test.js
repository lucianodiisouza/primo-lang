const assert = require('assert')
const testUtil = require('./test-util')

module.exports = (primo) => {
  assert.strictEqual(
    primo.eval([
      'dale',
      ['trem', 'x', 10],
      ['trem', 'y', 20],
      ['+', ['*', 'x', 'y'], 30],
    ]),
    230
  )

  assert.strictEqual(
    primo.eval([
      'dale',
      ['trem', 'x', 10],
      ['dale', ['trem', 'x', 20], 'x'],
      'x',
    ]),
    10
  )

  assert.strictEqual(
    primo.eval([
      'dale',

      ['trem', 'data', 10],

      ['dale', ['ponha', 'data', 100]],

      'data',
    ]),

    100
  )

  testUtil.test(
    primo,
    `
    (
      dale
      (trem x 10)
      (trem y 20)
      (+ (* x 10) y)
    )
  `,
    120
  )
}
