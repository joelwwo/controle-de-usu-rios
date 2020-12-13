'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ShoppinglistSchema extends Schema {
  up() {
    this.create('shoppinglists', (table) => {
      table.increments()
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('description', 400)
      table.bigInteger('amount').notNullable()
      table.boolean('paid').defaultTo(false)
      table.timestamps()
    })
  }

  down() {
    this.drop('shoppinglists')
  }
}

module.exports = ShoppinglistSchema
