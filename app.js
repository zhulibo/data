const Koa = require('koa')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const resDuration = require('./middlewares/resDuration')
const bodyparser = require('koa-bodyparser')
const router = require('./router')
const jwt = require('./middlewares/jwt')

const app = new Koa()
const port = 3000

app
  .use(resDuration)
  .use(logger())
  .use(cors({
    // origin: 'http://localhost:5173',
    origin: '*',
  }))
  .use(bodyparser())
  .use(jwt.checkToken())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port, () => {
  console.log(`server is running at http:localhost:${port}`)
})

// todo 新闻分类
