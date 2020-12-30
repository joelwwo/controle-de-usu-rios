class BaseService {
    model
    members

    async index() {
        if (this.members.length)
            return await this.model.query().with(this.members[0]).fetch()
        return await this.model.all()
    }

    async store(data) {
        const targetModel = await this.model.create(data)
        return targetModel
    }

    async show(id) {
        const targetModel = await this.model.find(id)
        if (!targetModel) return false
        if (this.members.length)
            await targetModel.loadMany(this.members)
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