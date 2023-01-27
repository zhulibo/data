const Router = require('@koa/router')
const router = new Router()
const common = require('./common/common')
const user = require("./user/user")
const article = require('./article')
const menu = require('./menu/menu')
const playground = require('./playground')

router.use('/common', common.routes(), common.allowedMethods())
      .use('/user', user.routes(), user.allowedMethods())
      .use('/article', article.routes(), article.allowedMethods())
      .use('/menu', menu.routes(), menu.allowedMethods())
      .use('/playground', playground.routes(), playground.allowedMethods())

module.exports = router
