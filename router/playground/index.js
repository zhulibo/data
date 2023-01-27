const Router = require('@koa/router')
const router = new Router()
const test = require('./test')

router.use('/test', test.routes(), test.allowedMethods())

module.exports = router
