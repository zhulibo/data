const db = require('../../utils/db')

async function uploadFile(ctx) {
  return {
    code: 0,
    msg: '成功',
    data: 'group1/M01/00/2B/wKgDmWMYKr6AQTUHAAM7Al28Plw730.png',
  }
}


module.exports = {
  uploadFile,
}
