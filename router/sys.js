const Router = require('@koa/router')
const db = require('../utils/db')

const sys = new Router()

sys
  .get('/loginCode', async (ctx) => {
    ctx.body = {
      code: 0,
      msg: '成功',
      data: {
        uuid: '2a2a33sdd3222ad1234565845',
        img: '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',
        code: 123456,
      }
    }
  })
  .post('/login', async (ctx) => {
    ctx.body = {
      code: 0,
      msg: '成功',
      data: {
        token: 's6df7ds45d45f4gd',
        userName: '张三',
        userId: '565123456',
        permissions: [
          'news:add',
          'news:edit',
          'news:del',
        ]
      },
    }
  })
  .get('/getRouter', async (ctx) => {
    ctx.body = {
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
                title: '新闻列表'
              },
              component: '/news/newsList'
            },
            {
              name: 'newsEdit',
              path: 'newsEdit',
              hidden: true,
              meta: {
                title: '新闻编辑'
              },
              component: '/news/newsEdit'
            },
            {
              name: 'newsCate',
              path: 'newsCate',
              meta: {
                title: '新闻分类'
              },
              component: '/news/newsCate'
            },
          ]
        },
        {
          name: 'sys',
          path: '/sys',
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
  })
  .post('/uploadFile', async (ctx) => {
    ctx.body = {
      code: 0,
      msg: '成功',
      data: 'group1/M00/00/11/wKh8y2FTz-uAcg4eAANg9jqW3xQ675.png',
    }
  })

module.exports = sys
