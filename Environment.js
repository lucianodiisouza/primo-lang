/**
 * Environment: names storage
 */

class Environment {
  /**
   * Creates an environment with the given record
   */
  constructor(record = {}, parent = null) {
    this.record = record
    this.parent = parent
  }
  /**
   * Creates a variable with the given name and value
   */
  define(name, value) {
    this.record[name] = value
    return value
  }
  /**
   * Returns the value of a defined variable, or throws
   * if the variable is not defined
   */
  lookup(name) {
    if (!this.record.hasOwnProperty(name)) {
      throw new ReferenceError(`Trem "${name}" is not defined.`)
    }

    return this.record[name]
  }
}

module.exports = Environment
