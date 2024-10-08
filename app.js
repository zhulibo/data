const Koa = require('koa')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const resDuration = require('./middlewares/resDuration')
const bodyParser = require('koa-bodyparser')
const router = require('./router')
const jwt = require('./middlewares/jwt')

const app = new Koa()
const port = 3001

app
  .use(resDuration)
  .use(logger())
  .use(cors({
    // origin: 'http://localhost:5173',
    origin: '*',
  }))
  .use(bodyParser())
  .use(jwt.checkToken())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port, () => {
  console.log(`server is running at http:localhost:${port}`)
})
