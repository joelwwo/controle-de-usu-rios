'use strict'

const CellphoneService = use("App/Services/CellphoneService")

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
    const cellPhones = await CellphoneService.index()
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
  async store({ request }) {
    const data = request.only(["user_id", "description", "number"])
    return await CellphoneService.store(data)
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
    const targetCellphone = await CellphoneService.show(params.id)
    if (!targetCellphone) return response.status(404).send({ message: 'Cellphone not found!' })
    return targetCellphone
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
    const data = request.only(["description", "number"])
    const targetCellphone = await CellphoneService.update(params.id, data)
    if (!targetCellphone) return response.status(404).send({ message: 'Cellphone not found!' })
    return targetCellphone
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
    const targetCellphone = await CellphoneService.destroy(params.id)
    if (!targetCellphone) return response.status(404).send({ message: 'Cellphone not found!' })
    return targetCellphone
  }
}

module.exports = CellphoneController
