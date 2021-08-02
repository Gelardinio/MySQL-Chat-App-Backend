var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Qawsedrf01!",
  database: "mydb"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    printTable("users")
});

createMessageTable = () => {
    var sql = "CREATE TABLE messages(name VARCHAR(255), message VARCHAR(8000), sendDate DATETIME)";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
}

createUserTable = () => { 
    var sql = "CREATE TABLE users(username VARCHAR(255), email VARCHAR(500), password VARCHAR(500), creationDate DATETIME)";
    con.query(sql, function(err, results) {
        if (err) throw err;
        console.log("Table created");        
    });
}

printTable = table => {
  con.query(`SELECT * FROM ${table}`, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
}
