let mysql = require('mysql2')

let pool = mysql.createPool({
  host            : 'localhost',
  port            : '3306',
  user            : 'root',
  password        : '123456',
  database        : 'test'
})

function query(sql) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) return reject(err)
      connection.query(sql, function(err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
        connection.release()
      })
    })
  })
}

// 管理员权限运行
// net start mysql80
// mysql -uroot -p123456
// show databases;
// use test;
// show tables;
// quit/exit

exports.query = query
