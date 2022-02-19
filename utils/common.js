function spliceSql(sql, body, params) {
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

module.exports = {
  spliceSql
}
