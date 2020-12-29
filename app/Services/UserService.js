const BaseService = use("App/Services/BaseService")
const User = use("App/Models/User")

class UserService extends BaseService {
    member = 'address'
    constructor() {
        super()
        this.model = User
        this.member = 'address'
    }
}

module.exports = new UserService()