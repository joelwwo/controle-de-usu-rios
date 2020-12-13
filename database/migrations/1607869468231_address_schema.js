'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressSchema extends Schema {
  up() {
    this.table('addresses', (table) => {
      table.string('location', 300)
    })
  }

  down() {
    this.table('addresses', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddressSchema
