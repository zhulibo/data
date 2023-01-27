const Router = require('@koa/router')
const testController = require("../../controller/playground/test");

const test = new Router()

test
  .get('/list', testController.getTestList)
  .get('/detail/:id', testController.getTestDetail)
  .post('/add', testController.addTest)
  .put('/update', testController.updateTest)
  .delete('/del/:id', testController.delTest)

module.exports = test
