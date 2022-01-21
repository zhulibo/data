const Koa = require('koa')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const bodyparser = require('koa-bodyparser')
const router = require('./router')
const jwt = require('./middlewares/jwt')

const app = new Koa()
const port = 3000
// ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
app
  .use(logger())
  .use(cors({
    origin: 'http://localhost:2000',
  }))
  .use(bodyparser())
  .use(jwt.checkToken())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port, () => {
  console.log(`server is running at http:localhost:${port}`)
})