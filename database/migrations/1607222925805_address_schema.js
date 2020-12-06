'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressSchema extends Schema {
  up() {
    this.create('addresses', (table) => {
      table.increments()
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name', 220).notNullable()
      table.string('cep', 8).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('addresses')
  }
}

module.exports = AddressSchema
