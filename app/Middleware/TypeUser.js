'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class TypeUser {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, params, response, auth }, next, props) {

    const typeUser = await auth.user.type
    const targetId = params.id
    const sessionUserId = auth.user.id

    if (typeUser == 'master')
      return await next()
    else if (props.includes('self') && targetId == sessionUserId)
      return await next()
    else if (props.includes(typeUser))
      return await next()

    return response.status(401).send({
      type: typeUser,
      message: 'Você não possui autorização para efetuar essa ação!'
    })

  }

}

module.exports = TypeUser
