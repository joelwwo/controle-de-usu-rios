'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CellphoneSchema extends Schema {
  up() {
    this.create('cellphones', (table) => {
      table.increments()
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('owner', 120).notNullable()
      table.string('number', 11).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('cellphones')
  }
}

module.exports = CellphoneSchema
