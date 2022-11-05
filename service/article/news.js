const db = require('../../utils/db')
const {updateSql, whereSql} = require("../../utils/common");

async function getNewsList( params, startTime, endTime, page, rows) {
  let where = whereSql(params)
  if (startTime) where += ` and createTime >= '${startTime}'`
  if (endTime) where += ` and createTime <= '${endTime}'`

  let sql = 'select * from news'
  sql += where
  sql += ` order by createTime desc limit ${(page - 1)*rows}, ${rows}`
  const data = await db.query(sql)

  let sqlTotal = `select count(*) from news`
  sqlTotal += where
  const [{'count(*)': total}] = await db.query(sqlTotal)

  return {
    code: 0,
    msg: '成功',
    data,
    total
  }
}

async function getNewsDetail(id) {
  const sql = 'select * from news where id = ' + id
  const data = await db.query(sql)
  if(data.length == 1) {
    return {
      code: 0,
      msg: '成功',
      data: data[0]
    }
  }else if(data.length == 0) {
    return {
      code: 1,
      msg: '暂无数据',
      data: {}
    }
  }else {
    return {
      code: 1,
      msg: '数据异常',
      data: {}
    }
  }
}

async function addNews(body) {
  const sql = `insert into news (title, cateId, status, imgUrl, content) values ('${body.title}', '${body.cateId}', '${body.status}', '${body.imgUrl}', '${body.content}')`
  const data = await db.query(sql)
  return {
    code: 0,
    msg: '成功',
    data: {}
  }
}

async function updateNews(body) {
  let sql = `update news set `
  sql = updateSql(sql, body, ['title', 'cateId', 'status', 'imgUrl', 'content'])
  sql += ` where id = ${body.id}`
  const data = await db.query(sql)
  return {
    code: 0,
    msg: '成功',
    data: {}
  }
}

// async function updateNews(body) {
//   const sql = `update news set title = '${body.title}', cateId = '${body.cateId}', status = '${body.status}', imgUrl = '${body.imgUrl}', content = '${body.content}' where id = ${body.id}`
//   const data = await db.query(sql)
//   return {
//     code: 0,
//     msg: '成功',
//     data: {}
//   }
// }

async function delNews(id) {
  const sql = `delete from news where id = ` + id
  const data = await db.query(sql)
  return {
    code: 0,
    msg: '成功',
    data: {}
  }
}

module.exports = {
  getNewsList,
  getNewsDetail,
  addNews,
  updateNews,
  delNews,
}
