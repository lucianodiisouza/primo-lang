const assert = require('assert')

/**
 * (if  <condition>
 *      <consequent>
 *      <alternate>
 * )
 */

module.exports = (primo) => {
  assert.strictEqual(
    primo.eval([
      'dale',
      ['trem', 'x', 10],
      ['trem', 'y', 0],
      ['se', ['>', 'x', 10], ['ponha', 'y', 20], ['ponha', 'y', 30]],
      'y',
    ]),
    30
  )
}
