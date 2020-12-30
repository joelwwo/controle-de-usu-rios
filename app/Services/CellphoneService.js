const BaseService = use("App/Services/BaseService")
const Cellphone = use("App/Models/Cellphone")

class CellphoneService extends BaseService {
    constructor() {
        super()
        this.model = Cellphone
        this.members = ['user']
    }
}

module.exports = new CellphoneService()