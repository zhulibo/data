const Koa = require('koa')
const logger = require('koa-logger')
const router = require('./router')

const app = new Koa()
const port = 3000

app
  .use(logger())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port, () => {
  console.log(`server is running at http:localhost:${port}`)
})
