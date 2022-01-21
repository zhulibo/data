const Router = require('@koa/router')
const router = new Router()
const news = require('./news')

router.use('/news', news.routes(), news.allowedMethods())

module.exports = router
