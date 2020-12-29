const Controllers = require('../controllers/index')
const router = require('koa-router')()

router.prefix('/privates')

// Controllers.user.login Controllers.模块.方法

router.get('/', function (ctx, next) {
  ctx.body = 'Private API'
})

// 用户登录
router.post('/login', Controllers.user.login)

module.exports = router

