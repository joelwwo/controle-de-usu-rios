class BaseService {
    model
    member

    constructor(model) {
        this.model = model
    }

    async index() {
        return await this.model.all()
    }

    setModel(model) {
        this.model = model
    }

    async store(data) {
        const targetModel = await this.model.create(data)
        return targetModel
    }

    async show(id) {
        const targetModel = await this.model.find(id)
        return targetModel
    }

    async update(id, data) {
        const targetModel = await this.model.find(id)
        if (!targetModel) return false
        targetModel.merge(data)
        await targetModel.save()
        return targetModel
    }

    async destroy(id) {
        const targetModel = await this.model.find(id)
        if (!targetModel) return false
        await targetModel.delete()
        return targetModel
    }

}

module.exports = BaseService