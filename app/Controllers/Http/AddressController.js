'use strict'

const Address = use('App/Models/Address')

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
    const address = await Address.query().with('user').fetch()
    return address
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
    const user_id = auth.user.id
    const data = request.only(['cep', 'name', 'publicPlace', 'details', 'neighborhood', 'city', 'state'])
    const address = await Address.create({ user_id, ...data })
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
  async show({ params, request, response, view }) {
    const address = Address.find(params.id)
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
    const address = await Address.find(params.id)
    if (!address) return response.status(404).send({ message: 'Address not found' })
    const data = request.only(['cep', 'name', 'publicPlace', 'details', 'neighborhood', 'city', 'state'])
    address.merge(data)
    await address.save()
    return address
  }

  /**
   * Delete a address with id.
   * DELETE addresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const address = await Address.find(params.id)
    if (!address) return response.status(404).send({ message: 'not found' })
    await address.delete()
    return address
  }
}

module.exports = AddressController
