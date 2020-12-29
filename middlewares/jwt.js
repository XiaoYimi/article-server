const koaJwt = require('koa-jwt')
const jsonWebToken = require('jsonwebtoken')
const { Token } = require('../config')

const jwtMiddleware = koaJwt({
  secret: Token.secret
})

module.exports = (ctx, next) => {
  try {
    if (typeof ctx.request.headers.authorization === 'string') {
      const token = ctx.request.headers.authorization.slice(7)
      ctx.jwtData = jsonWebToken.verify(token, Token.secret)
    } else {
      throw {
        code: 401,
        message: 'Not Authorization'
      }
    }
  } catch (err) {
    throw {
      code: 401,
      message: err.message
    }
  }
  next()
}
