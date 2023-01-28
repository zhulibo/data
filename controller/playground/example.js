const exampleService = require('../../service/playground/example')

async function getExampleList(ctx){
  const { title, status, startTime, endTime, page, rows } = ctx.query
  let data = await exampleService.getExampleList(
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

async function getExampleDetail(ctx){
  const id = ctx.params.id
  let data = await exampleService.getExampleDetail(id)
  return ctx.body = data
}

async function addExample(ctx){
  const body = ctx.request.body
  let data = await exampleService.addExample(body)
  return ctx.body = data
}

async function updateExample(ctx){
  const body = ctx.request.body
  let data = await exampleService.updateExample(body)
  return ctx.body = data
}

async function delExample(ctx){
  const id = ctx.params.id
  let data = await exampleService.delExample(id)
  return ctx.body = data
}

module.exports = {
  getExampleList,
  getExampleDetail,
  addExample,
  updateExample,
  delExample,
}
