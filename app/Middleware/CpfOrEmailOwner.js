'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use("App/Models/User")

class CpfOrEmailOwner {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, params, response }, next) {
    const data = request.only(["cpf", "email"])
    const { email, cpf } = data
    let errors = []
    const targetUserId = params.id
    if (email) {
      const userEmail = await User.findBy({ email })
      if (!userEmail) await next()
      if (userEmail.id != targetUserId)
        errors.push({ message: 'Esse e-mail já está em uso em outra conta!' })
    }
    if (cpf) {
      const userCpf = await User.findBy({ cpf })
      if (!userCpf) await next()
      if (userCpf.id != targetUserId)
        errors.push({ message: 'Esse CPF já está em uso em outra conta!' })
    }
    if (errors.length) return response.status(400).send(errors)
    await next()
  }
}

module.exports = CpfOrEmailOwner
