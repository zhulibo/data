const Router = require('@koa/router')
const common = new Router()
const commonController = require('../../controller/common/common')

common
  .post('/uploadFile', commonController.uploadFile)

module.exports = common
