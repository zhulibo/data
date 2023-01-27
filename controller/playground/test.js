const testService = require('../../service/playground/test')

async function getTestList(ctx){
  const { title, status, startTime, endTime, page, rows } = ctx.query
  let data = await testService.getTestList(
    {
      'title': title,
      'status': status,
    },
    startTime,
    endTime,
    page,
    rows,
  )
  return ctx.body = data
}

async function getTestDetail(ctx){
  const id = ctx.params.id
  let data = await testService.getTestDetail(id)
  return ctx.body = data
}

async function addTest(ctx){
  const body = ctx.request.body
  let data = await testService.addTest(body)
  return ctx.body = data
}

async function updateTest(ctx){
  const body = ctx.request.body
  let data = await testService.updateTest(body)
  return ctx.body = data
}

async function delTest(ctx){
  const id = ctx.params.id
  let data = await testService.delTest(id)
  return ctx.body = data
}

module.exports = {
  getTestList,
  getTestDetail,
  addTest,
  updateTest,
  delTest,
}
