const Router = require('@koa/router')
const menuController = require("../../controller/menu/menu");

const menu = new Router()

menu
  .get('/list', menuController.getMenuList)
  .get('/detail/:id', menuController.getMenuDetail)
  .post('/add', menuController.addMenu)
  .put('/update', menuController.updateMenu)
  .delete('/del/:id', menuController.delMenu)

module.exports = menu
