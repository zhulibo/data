const db = require('../../utils/db')
const jsonwebtoken = require('jsonwebtoken')

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
            { name: res[0].account, id: res[0].user_id },  // 加密userToken
            '666',
            { expiresIn: '30d' }
          ),
          userId: res[0].user_id,
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
  return {
    code: 0,
    msg: '成功',
    data: [
      {
        name: 'news',
        path: '/news',
        meta: {
          title: '新闻'
        },
        component: 'layout',
        children: [
          {
            name: 'newsList',
            path: 'newsList',
            meta: {
              title: '新闻列表',
              cache: true
            },
            component: '/news/newsList'
          },
          {
            name: 'newsEdit',
            path: 'newsEdit',
            meta: {
              title: '新闻编辑',
              hidden: true,
            },
            component: '/news/newsEdit'
          },
          {
            name: 'newsCate',
            path: 'newsCate',
            meta: {
              title: '新闻分类',
              cache: true
            },
            component: '/news/newsCate'
          },
        ]
      },
      {
        name: 'playground',
        path: '/playground',
        meta: {
          title: '测试'
        },
        component: 'layout',
        children: [
          {
            name: 'webSocket',
            path: 'webSocket',
            meta: {
              title: 'webSocket',
            },
            component: '/playground/webSocket'
          },
          {
            name: 'chart',
            path: 'chart',
            meta: {
              title: 'chart',
            },
            component: '/playground/chart'
          },
        ]
      },
      {
        name: 'sys',
        path: '/common',
        meta: {
          title: '系统'
        },
        component: 'layout',
        children: [
          {
            name: 'menu',
            path: 'menu',
            meta: {
              title: '菜单'
            },
            component: 'routeWrapper',
            children: [
              {
                name: 'menuList',
                path: 'menuList',
                meta: {
                  title: '菜单列表'
                },
                component: '/menu/menuList'
              },
            ]
          },
        ]
      },
    ]
  }
}

module.exports = {
  login,
  getRouter,
}
