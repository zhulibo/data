const Router = require('@koa/router')
const newsController = require("../../controller/article/news");

const news = new Router()

news
  .get('/list', newsController.getNewsList)
  .get('/detail/:id', newsController.getNewsDetail)
  .post('/add', newsController.addNews)
  .put('/update', newsController.updateNews)
  .delete('/del/:id', newsController.delNews)

module.exports = news
