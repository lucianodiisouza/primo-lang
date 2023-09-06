const assert = require('assert')

module.exports = (primo) => {
  assert.strictEqual(
    primo.eval([
      'dale',
      ['trem', 'counter', 0],
      ['trem', 'result', 0],

      [
        'enquanto',
        ['<', 'counter', 10],
        [
          'dale',
          //   TODO: counter++ / result++
          ['ponha', 'result', ['+', 'result', 1]],
          ['ponha', 'counter', ['+', 'counter', 1]],
        ],
      ],
      'result',
    ]),
    10
  )
}
