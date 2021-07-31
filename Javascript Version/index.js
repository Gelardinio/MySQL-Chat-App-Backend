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
    user: User
  }

  type Mutation {
    addBook(text: String, author: String): Message
    getMessage(table: String): MessageList
    register(username: String! email: String!, password: String!): User!
    login(email: String!, password: String!): String!
  }

  type User {
    username: String!
    email: String!
    password: String!
  }

`;

const SECRET = "tempsecret"

const resolvers = {
  Query: {
    messages: () => messages,
    
    user(parent, args, context, info) {
      return context.user
    }
  },

  Mutation: {
    addBook(parent, args, context, info) {
      console.log(args.text + " " + args.author)
      var time = new Date().toISOString().slice(0, 19).replace('T', ' ');
      var sql = `INSERT INTO user3 (name, message, sendDate) VALUES ('${args.author}', '${args.text}', '${time}')`;
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
    },

    register: async (parent, args) => {

      pass = await bcrypt.hash(args.password, 12);

      var time = new Date().toISOString().slice(0, 19).replace('T', ' ');
      var sql = `INSERT INTO users (username, email, password, creationDate) VALUES ('${args.username}', '${args.email}', '${pass}', '${time}')`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Inserted");
      });

      console.log("Success")

      //return user

    },

    login: async (parent, args, context) => {
      
      

    }

  }

};

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,

  context: async ({ req }) => {
    const token = await req.headers["authentication"];
    let user;
    try {
      user = await jwt.verify(token, SECRCET);
      console.log(`${user.user} user`);
    } catch (error) {
      console.log(`${error.message} caught`);
    }

    return {
      user,
      SECRET
    };

  }

});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});
