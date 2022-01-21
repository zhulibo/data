const Router = require('@koa/router')
const router = new Router()
const common = require('./common/common')
const user = require("./user/user")
const article = require('./article')

router.use('/common', common.routes(), common.allowedMethods())
      .use('/user', user.routes(), user.allowedMethods())
      .use('/article', article.routes(), article.allowedMethods())

module.exports = router
