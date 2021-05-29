const mysql = require('mysql')
let pool = mysql.createPool({
  host            : 'http://localhost/',
  port            : '3306',
  user            : 'root',
  password        : '123456',
  database        : 'test'
})

pool.getConnection(function(err, connection) {
  if (err) throw err // not connected!

  // Use the connection
  connection.query('SELECT something FROM sometable', function (error, results, fields) {
    // When done with the connection, release it.
    connection.release()

    // Handle error after the release.
    if (error) throw error

    // Don't use the connection here, it has been returned to the pool.
  })
})