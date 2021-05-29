class BaseService {
  model;
  members;

  async index() {
    try {
      if (this.members.length)
        return await this.model.query().with(this.members).fetch();
      return await this.model.all();
    } catch (e) {}
  }

  async store(data) {
    try {
      const targetModel = await this.model.create(data);
      return targetModel;
    } catch (error) {}
  }

  async show(id) {
    try {
      const targetModel = await this.model.find(id);
      if (!targetModel) return false;
      if (this.members.length) await targetModel.loadMany(this.members);
      return targetModel;
    } catch (error) {}
  }

  async update(id, data) {
    try {
      const targetModel = await this.model.find(id);
      if (!targetModel) return false;
      targetModel.merge(data);
      await targetModel.save();
      return targetModel;
    } catch (error) {}
  }

  async destroy(id) {
    try {
      const targetModel = await this.model.find(id);
      if (!targetModel) return false;
      await targetModel.delete();
      return targetModel;
    } catch (error) {}
  }
}

module.exports = BaseService;
