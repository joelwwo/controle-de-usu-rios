'use-strict'

const User = use("App/Models/User")

class userService {

    static async index() {
        const users = await User.query().with("address").fetch()
        return users
    }

    static async store(data) {
        const user = await User.create(data)
        return user
    }

    static async show(id) {
        const user = await User.find(id)
        return user
    }

    static async update(user, data) {
        user.merge(data)
        await user.save()
        return user
    }

    static async destroy(user) {
        await user.delete()
        return user
    }


}

module.exports = userService