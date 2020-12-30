const BaseService = use("App/Services/BaseService")
const User = use("App/Models/User")

class UserService extends BaseService {
    constructor() {
        super()
        this.model = User
        this.members = ['address', 'cellphone']
    }

    async getAllPurchases(id) {
        const targetUser = await User.find(id)
        const purchases = await targetUser.shoppinglist().fetch()
        return purchases
    }

    async getAllPaidPurchases(id) {
        const targetUser = await User.find(id)
        const purchases = await targetUser.shoppinglist()
            .where('paid', true).fetch()
        return purchases
    }

    async getAllUnPaidPurchases(id) {
        const targetUser = await User.find(id)
        const purchases = await targetUser.shoppinglist()
            .where('paid', false).fetch()
        return purchases
    }

}

module.exports = new UserService()