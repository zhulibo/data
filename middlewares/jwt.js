const jsonwebtoken = require('jsonwebtoken')

// 校验token
function checkToken(){
  return async (ctx, next) => {
    if(ctx.url !== '/user/login'){
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
    }else{
      await next()
    }
  }
}

module.exports = {
  checkToken,
}
