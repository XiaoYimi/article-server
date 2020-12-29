const Controllers = require('../controllers/index')
const router = require('koa-router')()

router.prefix('/publics')

router.get('/', function (ctx, next) {
  ctx.body = 'Public API'
})

router.get('/demo', Controllers.user.demo)

module.exports = router
