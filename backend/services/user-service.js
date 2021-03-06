const BaseService = require('./base-service')
const UserModel = require('../models/user')

class UserService extends BaseService{
  model = UserModel

  async findByUsername(username){
    return this.model.findOne({username: username})
  }
  async post(report){
    const user = await this.model.findOne({username: report.author})
    user.reports.push(report)
    await user.save()
  }
}

module.exports = new UserService();
