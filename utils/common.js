// 拼合update语句
function updateSql(sql, body, params) {
  for (let i = 0; i < params.length; i++) {
    if(body.hasOwnProperty(params[i])){
      sql += `${params[i]} = '${body[params[i]]}',`
    }
  }
  if(sql[sql.length - 1] === ','){
    sql = sql.slice(0, -1)
  }
  return sql
}

// 拼合where语句
function whereSql(params) {
  let sql = ' where 1 = 1'
  for (const key in params) {
    if (params[key]) {
      sql += ` and ${key} = '${params[key]}'`
    }
  }
  return sql
}

module.exports = {
  updateSql,
  whereSql,
}
