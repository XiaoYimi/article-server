const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const { mongoDB } = require('../config')
const { logger } = require('../middlewares/logger')

const MongoDB_URL = `mongodb://${mongoDB.host}:${mongoDB.port}/${mongoDB.database}`

mongoose.set('useCreateIndex', true) // 解决索引创建问题
mongoose.set('useFindAndModify', false) // 驱动即将废弃
const DBServer = mongoose.createConnection(MongoDB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
autoIncrement.initialize(DBServer)

DBServer.on('error', err => logger.info(new Error(err)))
DBServer.once('open', () => {
  logger.info(`MongoDB ${mongoDB.database} Connecting successfully`)
})

const DBInstance = {
  mongoose: mongoose,
  dbserver: DBServer,
  modles: {},
  getModel (name) { return this.modles[name] }
}

// 注册数据表
fs.readdirSync(__dirname) // 读取当前文件夹目录文件
  .filter(file => (file.indexOf('.') !== 0) && file !== 'index.js') // 排除当前文件 index.js
  .forEach(file => {
    const model = require(path.join(__dirname, file)) // 获取数据模型定义
    const schema = new mongoose.Schema(model.schema, { timestamps: true }) // 获取模型 Schema 对象
    model.indexs.forEach(item => schema.index(item)) // 创建索引
    // 实现指定字段(Number)自增
    if (model.incrementid) {
      schema.plugin(autoIncrement.plugin, {
        model: model.name,
        field: model.incrementid,
        startAt: 1,
        incrementBy: 1
      })
    }
    DBInstance.modles[model.name] = DBServer.model(model.name, schema, model.name) // 注册为表
  })

module.exports = DBInstance
