const Router = require('@koa/router')
const router = new Router()
const example = require('./example')

router.use('/example', example.routes(), example.allowedMethods())

module.exports = router
