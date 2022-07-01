const Koa = require('koa')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const bodyparser = require('koa-bodyparser')
const router = require('./router')
const jwt = require('./middlewares/jwt')

const app = new Koa()
const port = 9000

app
  .use(logger())
  .use(cors({
    // origin: 'http://localhost:2000',
    // origin: 'http://localhost:8080',
    origin: '*',
  }))
  .use(bodyparser())
  .use(jwt.checkToken())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port, () => {
  console.log(`server is running at http:localhost:${port}`)
})
