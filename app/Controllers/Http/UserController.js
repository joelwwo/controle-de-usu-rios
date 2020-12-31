'use strict'

const UserService = use("App/Services/UserService")
class UserController {

  async index() {
    const users = await UserService.index()
    return users
  }

  async store({ request }) {
    const data = request.only(["name", "email", "password", "type", "active"])
    return await UserService.store(data)
  }

  async show({ params, response }) {
    const targetUser = await UserService.show(params.id)
    if (!targetUser) return response.status(404).send({ message: 'User not found!' })
    return targetUser
  }

  async update({ params, request, response }) {
    const data = request.only(["name", "email", "password", "type", "active"])
    const targetUser = await UserService.update(params.id, data)
    if (!targetUser) return response.status(404).send({ message: 'User not found!' })
    return targetUser
  }

  async destroy({ params, response }) {
    const targetUser = await UserService.destroy(params.id)
    if (!targetUser) return response.status(404).send({ message: 'User not found!' })
    return targetUser
  }

  /* Personalizados */

  async getAllPurchases({ params, response }) {
    const purchases = await UserService.getAllPurchases(params.id)
    if (!purchases) return response.status(404).send({ message: 'User not found!' })
    return purchases
  }

  async getAllPaidPurchases({ params, response }) {
    const purchases = await UserService.getAllPaidPurchases(params.id)
    if (!purchases) return response.status(404).send({ message: 'User not found!' })
    return purchases
  }

  async getAllUnPaidPurchases({ params, response }) {
    const purchases = await UserService.getAllUnPaidPurchases(params.id)
    if (!purchases) return response.status(404).send({ message: 'User not found!' })
    return purchases
  }

  async getAllAdmin({ resquest, params }) {
    const targetUsers = await UserService.getAllAdmin()
    return targetUsers
  }

  async findBy({ request, params }) {
    const query = request.all()
    const targetUsers = await UserService.findBy(query)
    return targetUsers
  }

  async findNameLike({ params }) {
    const targetUsers = await UserService.findNameLike(params.query)
    return targetUsers
  }


}

module.exports = UserController
