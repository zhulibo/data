const mysql = require('mysql')

let pool = mysql.createPool({
  host            : 'localhost',
  port            : '3306',
  user            : 'root',
  password        : '123456',
  database        : 'test'
})

function query(sql, callback) {
  pool.getConnection(function(err, connection) {
    connection.query(sql, function(error, rows) {
      callback(error, rows)
      connection.release()
    })
  })
}

exports.query = query