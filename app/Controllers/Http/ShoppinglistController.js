"use strict";

const ShoppingListService = use("App/Services/ShoppinglistService");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with shoppinglists
 */
class ShoppinglistController {
  async index() {
    const shoppingList = await ShoppingListService.index();
    return shoppingList;
  }

  async store({ request, auth }) {
    const data = request.only(["user_id", "amount", "paid", "description"]);
    if (!data.user_id) data.user_id = auth.user.id;
    const purchase = await ShoppingListService.store(data);
    return purchase;
  }

  async show({ params, response }) {
    const targetPurchase = await ShoppingListService.show(params.id);
    if (!targetPurchase)
      return response.status(404).send({ message: "Purchase not found!" });
    return targetPurchase;
  }

  async update({ params, request, response }) {
    const data = request.only(["amount", "paid", "description"]);
    const targetPurchase = await ShoppingListService.update(params.id, data);
    if (!targetPurchase)
      return response.status(404).send({ message: "Purchase not found!" });
    return targetPurchase;
  }

  async destroy({ params, response }) {
    const targetPurchase = await ShoppingListService.destroy(params.id);
    if (!targetPurchase)
      return response.status(404).send({ message: "Purchase not found!" });
    return targetPurchase;
  }
}

module.exports = ShoppinglistController;
