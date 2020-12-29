const fs = require('fs')
const path = require('path')
const log4js = require('log4js')

const { logPath } = require('../config')

/* 日志文件目录 */
const logsDir = path.parse(logPath).dir

/* 日志文件目录不存在则创建它 */
if (!fs.existsSync(logsDir)) { fs.mkdirSync(logsDir) }

/* 配置 log4js. */ 
log4js.configure({
  appenders: {
    console: { type: 'console' },
    dateFile: { type: 'dateFile', filename: logPath, pattern: '-yyyy-MM-dd' }
  },
  categories: {
    default: {
      appenders: ['console', 'dateFile'],
      level: 'info'
    }
  }
})

/* Log Object */
const logger = log4js.getLogger('[Default]')

const loggerMiddleware = async (ctx, next) => {
  const stime = new Date()
  await next()
  const ms = new Date() - stime
  const remoteAddress = ctx.headers['x-forwarded-for'] || ctx.ip || ctx.ips || (ctx.socket && (ctx.socket.remoteAddress || (ctx.socket.socket && ctx.socket.socket.remoteAddress)))
  let logText = `${remoteAddress} ${ctx.method} ${ctx.url} ${ctx.status} ${ms}ms 请求参数: ${JSON.stringify(ctx.request.body)} 响应结果: ${JSON.stringify(ctx.body)}`
  // 写入项目日志并打印日志
  logger.info(logText)
}

module.exports = {
  logger,
  loggerMiddleware
}
