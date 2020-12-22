'use strict'

const userService = use("App/Services/userService")

const User = use("App/Models/User")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const users = await userService.index()
    return users
  }

  /**
   * Create/save a new shoppinglist.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const data = request.only(["name", "email", "password", "type", "active"])
    return await userService.store(data)
  }

  /**
   * Display a single shoppinglist.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    const user = await userService.show(params.id)
    if (!user) return response.status(404).send({ message: 'User not found!' })
    return user
  }

  /**
   * Update shoppinglist details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const user = await userService.show(params.id)
    if (!user) return response.status(404).send({ message: 'User not found!' })
    const data = request.only(["name", "email", "password", "type", "active"])
    return await userService.update(user, data)
  }

  /**
   * Delete a shoppinglist with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const user = await userService.show(params.id)
    if (!user) return response.status(404).send({ message: 'User not found!' })
    return await userService.destroy(user)
  }
}

module.exports = UserController
