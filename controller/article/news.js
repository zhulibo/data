const newsService = require('../../service/article/news')

async function getNewsList(ctx){
  const { title, cateId, status, startTime, endTime,  page, rows } = ctx.query
  let data = await newsService.getNewsList(
    {
      'title': title,
      'cateId': cateId,
      'status': status,
    },
    startTime,
    endTime,
    page,
    rows,
  )
  return ctx.body = data
}

async function getNewsDetail(ctx){
  const id = ctx.params.id
  let data = await newsService.getNewsDetail(id)
  return ctx.body = data
}

async function addNews(ctx){
  const body = ctx.request.body
  let data = await newsService.addNews(body)
  return ctx.body = data
}

async function updateNews(ctx){
  const body = ctx.request.body
  let data = await newsService.updateNews(body)
  return ctx.body = data
}

async function delNews(ctx){
  const id = ctx.params.id
  let data = await newsService.delNews(id)
  return ctx.body = data
}

module.exports = {
  getNewsList,
  getNewsDetail,
  addNews,
  updateNews,
  delNews,
}
