'use strict'

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
    const users = await User.query().with("address").fetch()
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
    const user = await User.create(data)
    return user
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
    const user = await User.find(params.id)
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
    const user = await User.find(params.id)
    if (!user) return response.status(404).send({ message: 'User not found!' })
    const data = request.only(["name", "email", "password", "type", "active"])
    user.merge(data)
    await user.save()
    return user
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
    const user = await User.find(params.id)
    if (!user) return response.status(404).send({ message: 'User not found!' })
    await user.delete()
    return user
  }
}

module.exports = UserController
