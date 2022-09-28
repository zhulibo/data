const Router = require('@koa/router')
const router = new Router()
const news = require('./news')
const newsCate = require("./newsCate");

router.use('/news', news.routes(), news.allowedMethods())
      .use('/newsCate', newsCate.routes(), newsCate.allowedMethods())

module.exports = router
