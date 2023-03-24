const db = require('../../utils/db')
const {updateSql} = require("../../utils/common");

async function getMenuList() {
  const sql = `select * from menu`
  let data = await db.query(sql)

  if(data.length === 0) {
    return {
      code: 0,
      msg: '成功',
      data: []
    }
  }

  console.time()
  data.map(subMenu => {
    if(subMenu.parentId !== 0){
      for (let j = 0; j < data.length; j++) {
        if(data[j].id == subMenu.parentId) {
          if(!data[j].children) data[j].children = []
          // 利用引用简化逻辑
          data[j].children.push(subMenu)
        }
      }
    }
  })

  // 删除data第一层中的非一级菜单
  let menuList = data.filter((item) => {
    return item.parentId === ''
  })

  // 根据orderNum排序
  function sort(menuList) {
    for (let i = 0; i < menuList.length; i++) {
      menuList.sort((a, b) => {
        return a.orderNum - b.orderNum
      })
    }
    if(menuList.children && menuList.children > 0) {
      sort(menuList.children)
    }
  }
  sort(menuList)
  console.timeEnd()

  return {
    code: 0,
    msg: '成功',
    data: menuList
  }
}

async function getMenuDetail(id) {
  const sql = 'select * from menu where id = ' + id
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

async function addMenu(body) {
  const sql = `insert into menu
  (parentId, title, component, name, path, hidden, cache, orderNum, status)
  values
  ('${body.parentId}', '${body.title}', '${body.component}', '${body.name}', '${body.path}', '${body.hidden}', '${body.cache}', '${body.orderNum}', '${body.status}')`
  const data = await db.query(sql)
  return {
    code: 0,
    msg: '成功',
    data: {}
  }
}

async function updateMenu(body) {
  let sql = `update menu set `
  sql = updateSql(sql, body, ['parentId', 'title', 'component', 'name', 'path', 'hidden', 'cache', 'orderNum', 'status'])
  sql += ` where id = ${body.id}`
  const data = await db.query(sql)
  return {
    code: 0,
    msg: '成功',
    data: {}
  }
}

async function delMenu(id) {
  const sql = `delete from menu where id = ` + id
  const data = await db.query(sql)
  return {
    code: 0,
    msg: '成功',
    data: {}
  }
}

module.exports = {
  getMenuList,
  getMenuDetail,
  addMenu,
  updateMenu,
  delMenu,
}
