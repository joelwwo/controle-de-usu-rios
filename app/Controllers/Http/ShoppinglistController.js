'use strict'

const ShoppingList = use("App/Models/Shoppinglist")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with shoppinglists
 */
class ShoppinglistController {
  /**
   * Show a list of all shoppinglists.
   * GET shoppinglists
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const shoppingList = await ShoppingList.all()
    return shoppingList
  }

  /**
   * Create/save a new shoppinglist.
   * POST shoppinglists
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const data = request.only(["amount", "paid", "description"])
    const purchase = await ShoppingList.create({ user_id: auth.user.id, ...data })
    return purchase
  }

  /**
   * Display a single shoppinglist.
   * GET shoppinglists/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    const purchase = await ShoppingList.find(params.id)
    if (!purchase) return response.status(404).send({ message: 'Purchase not found' })
    return purchase
  }

  /**
   * Update shoppinglist details.
   * PUT or PATCH shoppinglists/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const purchase = await ShoppingList.find(params.id)
    if (!purchase) return response.status(404).send({ message: 'Purchase not found' })
    const data = request.only(["amount", "paid", "description"])
    purchase.merge(data)
    await purchase.save()
    return purchase
  }

  /**
   * Delete a shoppinglist with id.
   * DELETE shoppinglists/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const purchase = await ShoppingList.find(params.id)
    if (!purchase) return response.status(404).send({ message: 'Purchase not found' })
    await purchase.delete()
    return purchase
  }
}

module.exports = ShoppinglistController
