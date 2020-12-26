'use strict'

const Address = use('App/Models/Address')
const addressService = use('App/Services/addressService')

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
    const addresses = await addressService.index()
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
  async store({ request, auth }) {
    const data = request.only(['cep', 'name', 'publicPlace', 'details', 'neighborhood', 'city', 'state'])
    const address = await addressService.store(auth.user.id, data)
    return address
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
    const address = await addressService.show(params.id)
    if (!address) return response.status(404).send({ message: 'Address not found' })
    return address
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
    const address = await addressService.show(params.id)
    if (!address) return response.status(404).send({ message: 'Address not found' })
    const data = request.only(['cep', 'name', 'publicPlace', 'details', 'neighborhood', 'city', 'state'])
    return await addressService.update(address, data)
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
    const address = await Address.find(params.id)
    if (!address) return response.status(404).send({ message: 'not found' })
    return await addressService.destroy(address)
  }
}

module.exports = AddressController
