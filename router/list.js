const Router = require('@koa/router')

const list = new Router()

list
  .get('/', async (ctx) => {
    ctx.body = '/home'
  })
  .get('/yinger', async (ctx) => {
    ctx.body = '/list/yinger'
  })
  .get('/wanju', async (ctx) => {
    ctx.body = '/list/wanju'
  })

module.exports = list