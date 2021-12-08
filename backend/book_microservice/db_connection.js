import mysql from 'mysql'

const db_config = {
    user: 'admin',
    password: '123456789',
    host: 'bookdb.cgjdqnzpl8at.us-east-1.rds.amazonaws.com',
    port: 3306,
    database: 'BookDB'
}

var db_connection;
  function connectToDb(callback) {
    const attemptConnection = () => {
      console.log('Attempting to connect to Book db')
      db_config.connectTimeout = 2000 // same as setTimeout to avoid server overload 
      db_connection = mysql.createConnection(db_config)
      db_connection.connect(function (err) {
        if (err) {
          console.log('Error connecting to book database, try again in 1 sec...')
          db_connection.destroy() // end immediately failed connection before creating new one
          setTimeout(attemptConnection, 2000)
        } else {
          callback()
        }
      })
    }
    attemptConnection()
  }

  connectToDb(() => {
      console.log("Connected to Book DB");
  });
  export default db_connection