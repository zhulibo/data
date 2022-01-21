const db = require('../../utils/db')

async function uploadFile(ctx) {
  return {
    code: 0,
    msg: '成功',
    data: 'group1/M00/00/11/wKh8y2FTz-uAcg4eAANg9jqW3xQ675.png',
  }
}


module.exports = {
  uploadFile,
}
