const Router = require('@koa/router')
const exampleController = require("../../controller/playground/example");

const example = new Router()

example
  .get('/list', exampleController.getExampleList)
  .get('/detail/:id', exampleController.getExampleDetail)
  .post('/add', exampleController.addExample)
  .put('/update', exampleController.updateExample)
  .delete('/del/:id', exampleController.delExample)

module.exports = example
