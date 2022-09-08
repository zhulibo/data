const db = require('../../utils/db')
const {spliceSql} = require("../../utils/common");

async function getMenuList() {
  const sql = `select * from menu order by id desc`
  let data = await db.query(sql)

  console.time()

  let menuList // 最终多级菜单
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
        menu: [data[i]],
      })
    } else {
      arr[index].menu.push(data[i])
    }
    isNewParentId = true
  }

  // 根据orderNum排序arr[i].menu
  for (let i = 0; i < arr.length; i++) {
    arr[i].menu.sort((a, b) => {
      return a.orderNum - b.orderNum
    })
  }

  // 并入一级菜单
  for (let i = 0; i < arr.length; i++) {
    if(arr[i].parentId === '') {
      menuList = arr[i].menu
    }
  }

  // 向一级菜单追加多级子菜单
  function addSubMenu (menuList) {
    for (let i = 0; i < menuList.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[j].parentId === String(menuList[i].id)) {
          menuList[i].children = arr[j].menu
          addSubMenu(menuList[i].children)
        }
      }
    }
  }

  addSubMenu(menuList)

  console.timeEnd() // 好像还没有多次查数据库快，待测试

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
  sql = spliceSql(sql, body, ['parentId', 'title', 'component', 'name', 'path', 'hidden', 'cache', 'orderNum', 'status'])
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
