const Router = require('@koa/router')
const user = new Router()
const userController = require('../../controller/user/user')

user
  .post('/login', userController.login)
  .get('/getRouter', userController.getRouter)

module.exports = user
