const Koa = require('koa')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const resDuration = require('./middlewares/resDuration')
const bodyparser = require('koa-bodyparser')
const router = require('./router')
const jwt = require('./middlewares/jwt')
const webSocket = require('ws')
const dayjs = require("dayjs");
const http = require('http')

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

const server = http.createServer(app.callback())
const ws = new webSocket.Server({server})
// const ws = new webSocket.Server({port: 3001})

ws.on('connection', client => {
  console.log('客户端连接成功')
  client.on('message', msg => {
    console.log('收到客户端信息：' + msg)
    client.send(JSON.stringify({
      type: 2,
      userName: 'server',
      msg: '收到了',
      time: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }))
  })
})
