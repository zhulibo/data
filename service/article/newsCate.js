const db = require('../../utils/db')
const {updateSql} = require("../../utils/common");

async function getNewsCateList() {
  const sql = `select * from news_cate`
  let data = await db.query(sql)

  console.time()

  if(data.length === 0) {
    return {
      code: 0,
      msg: '成功',
      data: []
    }
  }

  let newsCateList // 最终多级新闻分类
  const arr = [] // 根据parentId组成的二维数组
  let isNewParentId = true // 是否新的parentId
  let index = 0

  // data转化为arr
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j].parentId === data[i].parentId) {
        isNewParentId = false
        index = j
      }
    }
    if(isNewParentId) {
      arr.push({
        parentId: data[i].parentId,
        newsCate: [data[i]],
      })
    } else {
      arr[index].newsCate.push(data[i])
    }
    isNewParentId = true
  }

  // 根据orderNum排序arr[i].newsCate
  for (let i = 0; i < arr.length; i++) {
    arr[i].newsCate.sort((a, b) => {
      return a.orderNum - b.orderNum
    })
  }

  // 并入一级新闻分类
  for (let i = 0; i < arr.length; i++) {
    if(arr[i].parentId === '') {
      newsCateList = arr[i].newsCate
    }
  }

  // 向一级新闻分类追加多级子新闻分类
  function addSubNewsCate (newsCateList) {
    for (let i = 0; i < newsCateList.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[j].parentId === String(newsCateList[i].id)) {
          newsCateList[i].children = arr[j].newsCate
          addSubNewsCate(newsCateList[i].children)
        }
      }
    }
  }

  addSubNewsCate(newsCateList)

  console.timeEnd() // 好像还没有多次查数据库快，待测试

  return {
    code: 0,
    msg: '成功',
    data: newsCateList
  }
}

async function getNewsCateDetail(id) {
  const sql = 'select * from news_cate where id = ' + id
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

async function addNewsCate(body) {
  const sql = `insert into news_cate
  (parentId, name, orderNum, status)
  values
  ('${body.parentId}', '${body.name}', '${body.orderNum}', '${body.status}')`
  const data = await db.query(sql)
  return {
    code: 0,
    msg: '成功',
    data: {}
  }
}

async function updateNewsCate(body) {
  let sql = `update news_cate set `
  sql = updateSql(sql, body, ['parentId', 'name', 'orderNum', 'status'])
  sql += ` where id = ${body.id}`
  const data = await db.query(sql)
  return {
    code: 0,
    msg: '成功',
    data: {}
  }
}

async function delNewsCate(id) {
  const sql = `delete from news_cate where id = ` + id
  const data = await db.query(sql)
  return {
    code: 0,
    msg: '成功',
    data: {}
  }
}

module.exports = {
  getNewsCateList,
  getNewsCateDetail,
  addNewsCate,
  updateNewsCate,
  delNewsCate,
}
