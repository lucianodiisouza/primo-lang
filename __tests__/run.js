const Primo = require('../Primo')
const Environment = require('../Environment')

const tests = [
  require('./self-eval-test'),
  require('./math-test'),
  require('./block-test'),
  require('./variables-test'),
  require('./if-test'),
  require('./while-test'),
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
