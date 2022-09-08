const db = require('../../utils/db')
const jsonwebtoken = require('jsonwebtoken')
const {getMenuList} = require("../menu/menu");

async function login(ctx) {
  let {account, password} = ctx.request.body
  let sql = `select * from user where account = '${account}' and password = '${password}'`
  return db.query(sql).then(res => {
    if (res.length === 1) {
      return {
        code: 0,
        msg: '成功',
        data: {
          token: jsonwebtoken.sign(
            { name: res[0].account, id: res[0].userId },  // 加密userToken
            '666',
            { expiresIn: '30d' }
          ),
          userId: res[0].userId,
          userName: res[0].account,
          phone: res[0].phone,
          email: res[0].email,
          permissions: [
            'news:add',
            'news:edit',
            'news:del',
          ]
        },
      }
    } else {
      return {
        code: 1,
        msg: '用户名或密码不正确'
      }
    }
  })
}

async function getRouter(ctx) {
  const res = await getMenuList()
  const menuTree = res.data
  // 把自定义属性放在meta里（前端vue-router会过滤掉meta之外的属性） // todo 3级以上未处理
  for (let i = 0; i < menuTree.length; i++) {
    menuTree[i].meta = {
      title: menuTree[i].title,
      hidden: menuTree[i].hidden === 1,
      cache: menuTree[i].cache === 1,
    }
    if(menuTree[i].children?.length > 0) {
      for (let j = 0; j < menuTree[i].children.length; j++) {
        menuTree[i].children[j].meta = {
          title: menuTree[i].children[j].title,
          hidden: menuTree[i].children[j].hidden === 1,
          cache: menuTree[i].children[j].cache === 1,
        }
      }
    }
  }
  return {
    code: 0,
    msg: '成功',
    data: menuTree
  }
}

module.exports = {
  login,
  getRouter,
}
