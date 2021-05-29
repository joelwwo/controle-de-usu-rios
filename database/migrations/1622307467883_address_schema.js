"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddressSchema extends Schema {
  up() {
    this.table("addresses", (table) => {
      table.string("name", 220).alter();
      table.string("cep", 8).alter();
      table.string("publicPlace", 100).alter();
      table.string("details", 1000).alter();
      table.string("neighborhood", 1000).alter();
      table.string("city", 300).alter();
      table.string("state", 100).alter();
    });
  }

  down() {
    this.table("addresses", (table) => {
      // reverse alternations
    });
  }
}

module.exports = AddressSchema;
