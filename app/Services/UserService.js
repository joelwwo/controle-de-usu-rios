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

    async update(id, data) {
        const targetModel = await this.model.find(id)
        if (!targetModel) return false
        const { email, cpf } = data
        if (email) {
            const user = await User.findBy({ email })
            if (user.id != id)
                return [
                    { message: 'Esse e-mail já está em uso em outra conta!' }
                ]
        }
        if (cpf) {
            const user = await User.findBy({ cpf })
            if (user.id != id)
                return [
                    { message: 'Esse CPF já está em uso em outra conta!' }
                ]
        }
        targetModel.merge(data)
        await targetModel.save()
        return targetModel
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
        const targetUsers = await tableUser.whereNot({ type: 'user' })
        return targetUsers
    }

    async findBy(query) {
        const targetUsers = await User.query()
            .where({ ...query }).fetch()
        return targetUsers
    }

    async findNameLike(query) {
        const targetUsers = await User
            .query()
            .with('address')
            .with('cellphone')
            .where('name', 'LIKE', `%${query}%`).fetch()
        return targetUsers
    }

}

module.exports = new UserService()