'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Cellphone = use("App/Models/Cellphone")
class CellphoneOwner {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, params, response }, next) {

    const data = request.only(["number"])
    const { number } = data
    const targetCellphoneId = params.id
    const cellphone = await Cellphone.findBy({ number })

    if (!cellphone) await next()
    if (cellphone.id != targetCellphoneId)
      return response.status(400).send([{
        message: "Esse número já está em uso em outra conta."
      }])

    await next()

  }
}

module.exports = CellphoneOwner
