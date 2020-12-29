const BaseService = use("App/Services/BaseService")
const User = use("App/Models/User")

class UserService extends BaseService {
    constructor() {
        super()
        this.model = User
        this.members = ['address', 'cellphone']
    }
}

module.exports = new UserService()