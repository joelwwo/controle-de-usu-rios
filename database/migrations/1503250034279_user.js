'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 180).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 600).notNullable()
      table.enum('type', ['user', 'master', 'query', 'edit']).defaultTo('user')
      table.boolean('active').defaultTo(true)
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
