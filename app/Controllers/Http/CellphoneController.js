'use strict'

const Cellphone = use("App/Models/Cellphone")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with cellphones
 */
class CellphoneController {
  /**
   * Show a list of all cellphones.
   * GET cellphones
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const cellPhones = await Cellphone.all()
    return cellPhones
  }

  /**
   * Create/save a new cellphone.
   * POST cellphones
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const data = request.only(["owner", "number"])
    const cellphone = await Cellphone.create({ user_id: auth.user.id, ...data })
    return cellphone
  }

  /**
   * Display a single cellphone.
   * GET cellphones/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    const cellphone = await Cellphone.find(params.id)
    if (!cellphone) return response.status(404).send({ message: 'Cellphone not found' })
    return cellphone
  }

  /**
   * Update cellphone details.
   * PUT or PATCH cellphones/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const cellphone = await Cellphone.find(params.id)
    if (!cellphone) return response.status(404).send({ message: 'Cellphone not found' })
    const data = request.only(["owner", "number"])
    cellphone.merge(data)
    await cellphone.save()
    return cellphone
  }

  /**
   * Delete a cellphone with id.
   * DELETE cellphones/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const cellphone = await Cellphone.find(params.id)
    if (!cellphone) return response.status(404).send({ message: 'Cellphone not found' })
    await cellphone.delete()
    return cellphone
  }
}

module.exports = CellphoneController
