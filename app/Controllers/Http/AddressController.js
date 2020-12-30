'use strict'

const AddressService = use('App/Services/AddressService')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with addresses
 */
class AddressController {
  /**
   * Show a list of all addresses.
   * GET addresses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const addresses = await AddressService.index()
    return addresses
  }

  /**
   * Create/save a new address.
   * POST addresses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const data = request.only(['user_id', 'cep', 'name', 'publicPlace', 'details', 'neighborhood', 'city', 'state'])
    return await AddressService.store(data)
  }

  /**
   * Display a single address.
   * GET addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    const targetAddress = await AddressService.show(params.id)
    if (!targetAddress) return response.status(404).send({ message: 'Address not found!' })
    return targetAddress
  }

  /**
   * Update address details.
   * PUT or PATCH addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.only(['cep', 'name', 'publicPlace', 'details', 'neighborhood', 'city', 'state'])
    const targetAddress = await AddressService.update(params.id, data)
    if (!targetAddress) return response.status(404).send({ message: 'Address not found!' })
    return targetAddress
  }

  /**
   * Delete a address with id.
   * DELETE addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const targetAddress = await AddressService.destroy(params.id)
    if (!targetAddress) return response.status(404).send({ message: 'Address not found!' })
    return targetAddress
  }
}

module.exports = AddressController
