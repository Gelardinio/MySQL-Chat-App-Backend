var mysql = require('mysql');

export const conToExport = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Qawsedrf01!",
  database: "mydb"
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Qawsedrf01!",
  database: "mydb"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    deleteUserTable();
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

createTableWithUsername = (userName) => {
  var sql = `CREATE TABLE ${userName}(chatName VARCHAR(255), otherUser VARCHAR(255), creationDate DATETIME)`;
}

createChatTable = (chatName) => {
  var sql = `CREATE TABLE ${chatName}(message VARCHAR(8000), sentBy VARCHAR(255), date DATETIME)`;
}

printTable = table => {
  con.query(`SELECT * FROM ${table}`, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
}

deleteUserTable = () => {
  var sql = "DELETE FROM users WHERE username='Gerald'";
  con.query(sql, function(err, results) {
    if (err) throw err;
    console.log("Table created");        
  }); 
}
