const Primo = require('../Primo')
const Environment = require('../Environment')

const tests = [
  require('./self-eval-test.js'),
  require('./math-test.js'),
  require('./block-test.js'),
  require('./variables-test.js'),
]

const primo = new Primo(
  new Environment({
    null: null,
    true: true,
    false: false,
    VERSION: '0.1',
  })
)

tests.forEach((test) => test(primo))
console.log('All assertions passed!')
