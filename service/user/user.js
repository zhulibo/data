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
  // 把自定义属性放在meta上(vue-router会过滤掉除meta之外的属性)
  function setMeta(list) {
    for (let i = 0; i < list.length; i++) {
      list[i].meta = {
        title: list[i].title,
        hidden: list[i].hidden === 1,
        cache: list[i].cache === 1,
      }
      if(list[i].children?.length > 0) {
        setMeta(list[i].children)
      }
    }
  }
  setMeta(menuTree)
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
