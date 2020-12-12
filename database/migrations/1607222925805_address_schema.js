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
      table.string('publicPlace', 400).notNullable()
      table.string('details', 300)
      table.string('neighborhood', 120).notNullable()
      table.string('city', 50).notNullable()
      table.string('state', 5).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('addresses')
  }
}

module.exports = AddressSchema
