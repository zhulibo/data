let mysql = require('mysql2')

let pool = mysql.createPool({
  host            : 'localhost',
  port            : '3306',
  user            : 'root',
  password        : 'zhu022044',
  database        : 'main',
  dateStrings     :  true
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
// mysql -uroot -pzhu022044
// show databases;
// use test;
// show tables;
// quit/exit;

exports.query = query
