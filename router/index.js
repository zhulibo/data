const Router = require('@koa/router')
const router = new Router()
const sys = require('./sys')
const test = require('./test')


router.use('/sys', sys.routes(), sys.allowedMethods())
router.use('/test', test.routes(), test.allowedMethods())

module.exports = router
