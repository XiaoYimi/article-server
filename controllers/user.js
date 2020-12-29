const Models = require('../models/index')
const userModel = Models.getModel('user')

class User {
  constructor () {

  }

  async demo (ctx, next) {
    ctx.body = { code: 0, data: {} }
    next()
  }

  login (ctx, next) {
    ctx.body = { }
    next()
  }
}

module.exports = new User()
