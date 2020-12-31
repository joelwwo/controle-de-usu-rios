const BaseService = use("App/Services/BaseService")
const User = use("App/Models/User")
const Database = use('Database')
const user = Database.table('users')

class UserService extends BaseService {
    constructor() {
        super()
        this.model = User
        this.members = ['address', 'cellphone']
    }

    async getAllPurchases(id) {
        const targetUser = await User.find(id)
        if (!targetUser) return false
        const purchases = await targetUser.shoppinglist().fetch()
        return purchases
    }

    async getAllPaidPurchases(id) {
        const targetUser = await User.find(id)
        if (!targetUser) return false
        const purchases = await targetUser.shoppinglist()
            .where('paid', true).fetch()
        return purchases
    }

    async getAllUnPaidPurchases(id) {
        const targetUser = await User.find(id)
        if (!targetUser) return false
        const purchases = await targetUser.shoppinglist()
            .where('paid', false).fetch()
        return purchases
    }

    async getAllAdmin() {
        const targetUsers = await user.whereNot({ type: 'user' })
        return targetUsers
    }

    /* async findBy(query) {
        const { name } = query
        if (name) {
            const targetUsers = await user.where('name', 'LIKE', `%${name}%`)
                .where('email', 'LIKE', `%${name}%`)
            return targetUsers
        }
        const targetUsers = await User.findBy(query)
        return targetUsers
    } */

    async findBy(query) {
        const targetUsers = await User.query()
            .where({ ...query }).fetch()
        return targetUsers
    }

    async findNameLike(query) {
        const targetUsers = await user
            .where('name', 'LIKE', `%${query}%`)
        return targetUsers
    }

}

module.exports = new UserService()