const menuService = require('../../service/menu/menu')

async function getMenuList(ctx){
  let data = await menuService.getMenuList()
  return ctx.body = data
}

async function getMenuDetail(ctx){
  const id = ctx.params.id
  let data = await menuService.getMenuDetail(id)
  return ctx.body = data
}

async function addMenu(ctx){
  const body = ctx.request.body
  let data = await menuService.addMenu(body)
  return ctx.body = data
}

async function updateMenu(ctx){
  const body = ctx.request.body
  let data = await menuService.updateMenu(body)
  return ctx.body = data
}

async function delMenu(ctx){
  const id = ctx.params.id
  let data = await menuService.delMenu(id)
  return ctx.body = data
}

module.exports = {
  getMenuList,
  getMenuDetail,
  addMenu,
  updateMenu,
  delMenu,
}
