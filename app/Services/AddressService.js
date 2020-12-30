const BaseService = use("App/Services/BaseService")
const Address = use("App/Models/Address")

class AddressService extends BaseService {
    constructor() {
        super()
        this.model = Address
        this.members = ['user']
    }
}

module.exports = new AddressService()