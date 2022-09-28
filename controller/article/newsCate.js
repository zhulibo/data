const newsCateService = require('../../service/article/newsCate')

async function getNewsCateList(ctx){
  const { page, rows } = ctx.query
  let data = await newsCateService.getNewsCateList(page, rows)
  return ctx.body = data
}

async function getNewsCateDetail(ctx){
  const id = ctx.params.id
  let data = await newsCateService.getNewsCateDetail(id)
  return ctx.body = data
}

async function addNewsCate(ctx){
  const body = ctx.request.body
  let data = await newsCateService.addNewsCate(body)
  return ctx.body = data
}

async function updateNewsCate(ctx){
  const body = ctx.request.body
  let data = await newsCateService.updateNewsCate(body)
  return ctx.body = data
}

async function delNewsCate(ctx){
  const id = ctx.params.id
  let data = await newsCateService.delNewsCate(id)
  return ctx.body = data
}

module.exports = {
  getNewsCateList,
  getNewsCateDetail,
  addNewsCate,
  updateNewsCate,
  delNewsCate,
}
