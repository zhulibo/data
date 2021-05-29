const Router = require('@koa/router')
const list = require('./list')

const router = new Router()

router.use('/list', list.routes(), list.allowedMethods())

router.redirect('/', '/list')

module.exports = router