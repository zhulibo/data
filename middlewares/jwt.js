const jsonwebtoken = require('jsonwebtoken')

// 校验token
function checkToken(){
  return async (ctx, next) => {
    // 免验证白名单
    const whiteUrlList = [
      '/user/login',
      '/common/uploadFile',
      '/webSocket'
    ]
    if (!whiteUrlList.includes(ctx.url)) {
      let token = ctx.header.authorization
      try{
        jsonwebtoken.verify(token.split(' ')[1], '666')
        await next()
      }catch (err){
        ctx.status = 401
        ctx.body = {
          code: 0,
          msg: err.message
        }
      }
    }
    // else if (ctx.url === '/webSocket') {
    //   console.log(1)
    //   ctx.status = 200
    //   ctx.body = {
    //     code: 0,
    //     msg: ''
    //   }
    //   console.log(2)
    // }
    else {
      await next()
    }
  }
}

module.exports = {
  checkToken,
}
