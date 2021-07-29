const { ApolloServer, gql } = require('apollo-server');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Qawsedrf01!",
  database: "mydb"
});

const typeDefs = gql`

  type Message {
    text: String
    author: Author
  }

  type Author {
    name: String
  }

  type MessageList {
    table: String
  }

  type Query {
    messages: [Message]
    authors: [Author]
  }

  type Mutation {
    addBook(text: String, author: String): Message
    getMessage(table: String): MessageList
  }

`;

const resolvers = {
  Query: {
    messages: () => messages,
  },

  Mutation: {
    addBook(parent, args, context, info) {
      console.log(args.text + " " + args.author)
      var bruh = new Date().toISOString().slice(0, 19).replace('T', ' ');
      var sql = `INSERT INTO user3 (name, message, sendDate) VALUES ('${args.author}', '${args.text}', '${bruh}')`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Inserted");
      });
    },

    getMessage(parent, args, context, info) {
      con.query(`SELECT * FROM ${args.table}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });  
    }
  }

};

const server = new ApolloServer({ typeDefs, resolvers });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});
