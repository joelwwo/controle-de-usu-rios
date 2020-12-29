const BaseService = use("App/Services/BaseService")
const User = use("App/Models/User")

class UserService extends BaseService {
    constructor() {
        super()
        this.model = User
        this.member = 'address'
    }
}

module.exports = new UserService()