const BaseService = use("App/Services/BaseService")
const Shoppinglist = use("App/Models/Shoppinglist")

class ShoppingListService extends BaseService {
    constructor() {
        super()
        this.model = Shoppinglist
        this.members = ['user']
    }
}

module.exports = new ShoppingListService()