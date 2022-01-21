const userService = require('../../service/user/user')

async function login(ctx){
  let data = await userService.login(ctx)
  return ctx.body = data
}

async function getRouter(ctx){
  let data = await userService.getRouter(ctx)
  return ctx.body = data
}

module.exports = {
  login,
  getRouter,
}
