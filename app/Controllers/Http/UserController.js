'use strict'

const userService = use("App/Services/userService")
class UserController {

  async index() {
    const users = await userService.index()
    return users
  }

  async store({ request }) {
    const data = request.only(["name", "email", "password", "type", "active"])
    return await userService.store(data)
  }

  async show({ params, response }) {
    const user = await userService.show(params.id)
    if (!user) return response.status(404).send({ message: 'User not found!' })
    return user
  }

  async update({ params, request, response }) {
    const user = await userService.show(params.id)
    if (!user) return response.status(404).send({ message: 'User not found!' })
    const data = request.only(["name", "email", "password", "type", "active"])
    return await userService.update(user, data)
  }

  async destroy({ params, response }) {
    const user = await userService.show(params.id)
    if (!user) return response.status(404).send({ message: 'User not found!' })
    return await userService.destroy(user)
  }

}

module.exports = UserController
