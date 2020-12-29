const { logger } = require('./logger')

const responseHandler = ctx => {
  if (ctx.body !== undefined) {
    ctx.type = 'json'
    ctx.body = {
      code: (ctx.body.code === 0 ? 0 : ctx.body.code) || -1,
      message: ctx.body.message || ctx.statusText,
      data: ctx.body.data || null,
      method: ctx.method || null,
      host: ctx.request.header.host || null,
      url: ctx.originalUrl || null,
      reqParams: ctx.request.body || null
    }
  }
}

const errorHandler = (ctx, next) => {
  return next().catch(err => {
    console.log('errorHandler', err.code)
    if (err.code == null) { logger.error(err.stack) }
    ctx.body = {
      code: err.code || -1,
      message: err.message.tirm(),
      data: null,
      method: ctx.method || null,
      host: ctx.request.header.host || null,
      url: ctx.originalUrl || null,
      reqParams: ctx.request.body || null
    }
    ctx.status = 200
    return Promise.resolve()
  })
}

module.exports = {
  responseHandler,
  errorHandler
}
