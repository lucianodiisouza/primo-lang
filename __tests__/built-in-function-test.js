const assert = require('assert')
const { test } = require('./test-util')

module.exports = (primo) => {
  // Math functions
  test(primo, `(+ 1 5)`, 6)
  test(primo, `(+ (+ 2 3) 5)`, 10)
  test(primo, `(+ (* 2 3) 5)`, 11)
  // Comparison
  test(primo, `(> 1 5)`, false)
  test(primo, `(< 1 5)`, true)
  test(primo, `(>= 5 5)`, true)
  test(primo, `(<= 5 5)`, true)
  test(primo, `(= 5 5)`, true)
}
