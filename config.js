const path = require('path')

module.exports = {
  name: 'admin-server',
  port: 3030, // 项目API访问的端口
  publicDir: path.resolve(__dirname, './public'), // 静态资源缓存
  logPath: path.resolve(__dirname, './logs/app.log'), // 后台系统日志

  // 数据库配置
  mongoDB: {
    host: '127.0.0.1',
    port: 27017,
    database: 'articleserver',
    username: 'xiaoyimi',
    password: 'root'
  },

  // Redis 配置
  Redis: {
    host: '127.0.0.1',
    prot: 6379,
    hash: 'articleredis'
  },

  // SMTP 配置
  SMTP: {
    host: 'smtp.qq.com',
    user: '2590856083@qq.com',
    pass: 'bcarlbrfsgzhdi', // 上线必须隐藏
  },

  // Token 配置
  Token: {
    secret: 'token反向解析',
    hour: 2, // 有效期 2 小时
    get expire () {
      return (+new Date) + (1000 * 60 * 60 * this.hour)
    }
  },

  // 验证码配置
  Vcode: {
    seconds: 60,
    // 获取验证码
    get code () {
      return Math.random().toString().slice(2, 6).toUpperCase()
    },
    // 验证码有效时长
    get expire () {
      return (+new Date) + (this.seconds * 1000)
    }
  }
}
