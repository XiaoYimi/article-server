const Koa = require('koa')
const app = new Koa()

// 项目配置
const { publicDir } = require('./config')

const views = require('koa-views')
// const json = require('koa-json')
// const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
// const logger = require('koa-logger')

// 静态文件处理
const koaStaticCache = require('koa-static-cache')

// 日志记录(中间件第一位使用)
const { loggerMiddleware } = require('./middlewares/logger')

// 防黑客攻击
const koaHelmet = require('koa-helmet')

// 跨域处理
const koa2Core = require('koa2-cors')
const { corsHandler } = require('./middlewares/cors')

// 注册路由
const publics = require('./routes/publics')
const privates = require('./routes/privates')


const { responseHandler, errorHandler } = require('./middlewares/response')
// error handler
// onerror(app)

// middlewares
app.use(loggerMiddleware)

// 中间件报错处理
app.use(errorHandler)

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
// app.use(json())
// app.use(logger())
// app.use(require('koa-static')(__dirname + '/public'))

app.use(koaStaticCache(publicDir))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

app.use(koaHelmet())
app.use(koa2Core(corsHandler))

// routes
app.use(publics.routes(), publics.allowedMethods())
app.use(privates.routes(), privates.allowedMethods())


app.use(responseHandler)

// error-handling
// app.on('error', (err, ctx) => {
//   console.error('server error', err, ctx)
// });

module.exports = app
