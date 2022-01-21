const commonService = require('../../service/common/common')

async function uploadFile(ctx){
  let data = await commonService.uploadFile(ctx)
  return ctx.body = data
}

module.exports = {
  uploadFile,
}
