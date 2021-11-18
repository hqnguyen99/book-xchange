import mysql from 'mysql'

const db_config = {
    user: 'admin',
    password: '123456789',
    host: 'userdatabase.c5pzwtvhuslw.us-east-1.rds.amazonaws.com',
    port: 3306,
    database: 'UserDB'
}

const db_connection = mysql.createConnection(db_config)

db_connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });

  export default db_connection