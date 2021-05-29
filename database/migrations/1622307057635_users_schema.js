"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UsersSchema extends Schema {
  up() {
    this.table("users", (table) => {
      // alter table
    });
  }

  down() {
    this.table("users", (table) => {
      table.string("email", 254).unique().alter();
    });
  }
}

module.exports = UsersSchema;
