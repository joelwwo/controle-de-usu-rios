'use-strict'

const Address = use("App/Models/Address")

class addressService {

    static async index() {
        const addresses = await Address.query().with("user").fetch()
        return addresses
    }

    static async store(user_id, data) {
        const address = await Address.create({ user_id, ...data })
        return address
    }

    static async show(id) {
        const address = await Address.find(id)
        return address
    }

    static async update(address, data) {
        address.merge(data)
        await address.save()
        return address
    }

    static async destroy(address) {
        await address.delete()
        return address
    }


}

module.exports = addressService