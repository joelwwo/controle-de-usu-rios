const BaseService = use("App/Services/BaseService")
const User = use("App/Models/User")
const Database = use('Database')
const tableUser = Database.table('users')

class UserService extends BaseService {
    constructor() {
        super()
        this.model = User
        this.members = ['address', 'cellphone']
    }

    async getAllPurchases(id) {
        try {
            const targetUser = await User.find(id)
            if (!targetUser) return false
            const purchases = await targetUser.shoppinglist().fetch()
            return purchases
        } catch (error) {

        }
    }

    async getAllPaidPurchases(id) {
        try {
            const targetUser = await User.find(id)
            if (!targetUser) return false
            const purchases = await targetUser.shoppinglist()
                .where('paid', true).fetch()
            return purchases
        } catch (error) {

        }
    }

    async getAllUnPaidPurchases(id) {
        try {
            const targetUser = await User.find(id)
            if (!targetUser) return false
            const purchases = await targetUser.shoppinglist()
                .where('paid', false).fetch()
            return purchases
        } catch (error) {

        }
    }

    async getAllAdmin() {
        try {
            const targetUsers = await tableUser.whereNot({ type: 'user' })
            return targetUsers
        } catch (error) {

        }
    }

    async findBy(query) {
        try {
            const targetUsers = await User.query()
                .where({ ...query }).fetch()
            return targetUsers
        } catch (error) {

        }
    }

    async findNameLike(query) {
        try {
            const targetUsers = await User
                .query()
                .with('address')
                .with('cellphone')
                .where('name', 'LIKE', `%${query}%`).fetch()
            return targetUsers
        } catch (error) {

        }
    }

}

module.exports = new UserService()