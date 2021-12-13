const Router = require('@koa/router')
const bodyparser = require('koa-bodyparser')
const db = require('../../utils/db')

const news = new Router()

news.use(bodyparser())

news
  .get('/list', async (ctx) => {
    const { page, rows } = ctx.query
    const sql = `select * from news_list order by id desc limit ${(page - 1)*rows}, ${rows}`
    const data = await db.query(sql)
    ctx.body = {
      code: 0,
      msg: '成功',
      data: data,
      total: 13
    }
  })
  .get('/detail', async (ctx) => {
    const sql = 'select * from news_list where id = ' + ctx.query.id
    const data = await db.query(sql)
    if(data.length == 1) {
      ctx.body = {
        code: 0,
        msg: '成功',
        data: data[0]
      }
    }else if(data.length == 0) {
      ctx.body = {
        code: 1,
        msg: '暂无数据',
        data: {}
      }
    }else {
      ctx.body = {
        code: 1,
        msg: '数据异常',
        data: {}
      }
    }
  })
  .post('/add', async (ctx) => {
    const body = ctx.request.body
    const sql = `insert into news_list (title, type, status, imgUrl, content) values ('${body.title}', '${body.type}', '${body.status}', '${body.imgUrl}', '${body.content}')`
    const data = await db.query(sql)
    ctx.body = {
      code: 0,
      msg: '成功',
      data: {}
    }
  })
  .put('/edit', async (ctx) => {
    const body = ctx.request.body
    const sql = `update news_list set title = '${body.title}', type = '${body.type}', status = '${body.status}', imgUrl = '${body.imgUrl}', content = '${body.content}' where id = ${body.id}`
    const data = await db.query(sql)
    ctx.body = {
      code: 0,
      msg: '成功',
      data: {}
    }
  })
  .delete('/del', async (ctx) => {
    const sql = `delete from news_list where id = ${ctx.request.body.id}`
    const data = await db.query(sql)
    ctx.body = {
      code: 0,
      msg: '成功',
      data: {}
    }
  })

module.exports = news
