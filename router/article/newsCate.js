const Router = require('@koa/router')
const newsCateController = require("../../controller/article/newsCate");

const newsCate = new Router()

newsCate
  .get('/list', newsCateController.getNewsCateList)
  .get('/detail/:id', newsCateController.getNewsCateDetail)
  .post('/add', newsCateController.addNewsCate)
  .put('/update', newsCateController.updateNewsCate)
  .delete('/del/:id', newsCateController.delNewsCate)

module.exports = newsCate
