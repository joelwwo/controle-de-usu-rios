'use strict'

const UserService = use("App/Services/UserService")
const User = use("App/Models/User")
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
    let targetUser = await UserService.show(params.id)
    if (!targetUser) return response.status(404).send({ message: 'User not found!' })
    await targetUser.loadMany(['address', 'cellphone'])
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

}

module.exports = UserController
