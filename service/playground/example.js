const db = require('../../utils/db')
const {updateSql, whereSql} = require("../../utils/common");

async function getExampleList(params, startTime, endTime, page, rows) {
  let where = whereSql(params)
  if (startTime) where += ` and createTime >= '${startTime}'`
  if (endTime) where += ` and createTime <= '${endTime}'`

  let sql = 'select * from example'
  sql += where
  sql += ` order by createTime desc limit ${(page - 1)*rows}, ${rows}`
  const data = await db.query(sql)

  let sqlTotal = `select count(*) from example`
  sqlTotal += where
  const [{'count(*)': total}] = await db.query(sqlTotal)

  return {
    code: 0,
    msg: '成功',
    data,
    total
  }
}

async function getExampleDetail(id) {
  const sql = 'select * from example where id = ' + id
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

async function addExample(body) {
  const sql = `insert into example
  (title, status, size)
  values
  ('${body.title}', '${body.status}', '${body.size}')`
  const data = await db.query(sql)
  return {
    code: 0,
    msg: '成功',
    data: {}
  }
}

async function updateExample(body) {
  let sql = `update example set `
  sql = updateSql(sql, body, ['title', 'status', 'size'])
  sql += ` where id = ${body.id}`
  const data = await db.query(sql)
  return {
    code: 0,
    msg: '成功',
    data: {}
  }
}

async function delExample(id) {
  const sql = `delete from example where id = ` + id
  const data = await db.query(sql)
  return {
    code: 0,
    msg: '成功',
    data: {}
  }
}

module.exports = {
  getExampleList,
  getExampleDetail,
  addExample,
  updateExample,
  delExample,
}
