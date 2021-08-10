const { ApolloServer, gql } = require('apollo-server');
//import { typeDefs } from './schema.js';
//import { resolvers } from './resolver.js';
//import { SECRET } from './secret.js';
//import { conToExport as con} from './createdb.js';
var mysql = require('mysql2');
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

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
    user: String
  }

  type Mutation {
    addMessage(text: String, author: String): Message
    getMessage(table: String): MessageList
    createChat(chatName: String otherUser: String): String
    register(username: String! email: String!, password: String!): User!
    login(email: String!, password: String!): String!
  }

  type User {
    username: String
    email: String
    password: String
  }
`;

const resolvers = {
  Query: {
    messages: () => messages,
    
    user(parent, args, context, info) {
      if (!context.user) {
        throw new Error("Please log in  to view this information");
      } else {
        console.log(context.user)
        return context.user.user
      }
    }
  },

  Mutation: {
    addMessage(parent, args, context, info) {
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

      sql = `CREATE TABLE ${args.email}(chatName VARCHAR(255), otherUser VARCHAR(255), creationDate DATETIME)`;

      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Created");
      });

      console.log("Success")

      const user = {
        username: args.username,
        email: args.email,
        password: pass
      }

      return user

    },

    login: async (parent, args, context) => {

      var theResult = "";

      async function get_info(email) {
        const results = await con.promise().query(`SELECT * FROM users WHERE email = '${email}'`)
        return results[0][0].password
      }

      theResult = await get_info(args.email)

      const isValid = await bcrypt.compare(args.password, theResult);

      if (!isValid) {
        throw new Error("Incorrect password");
      }

      console.log(theResult)

      const token = await jwt.sign(
        {
          user: args.email
        },
        SECRET,
        {expiresIn: "1h" }
      ); 

      console.log(token)

      return token;

    }

  },

  createChat: async (parent, args, context) => {

    var time = new Date().toISOString().slice(0, 19).replace('T', ' ');

    var sql = `INSERT INTO ${context.user.user} (chatName, otherUser, creationDate) VALUES ('${args.chatName}', '${args.otherUser}', '${time}')`;

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Inserted");
    });

    sql = `CREATE TABLE ${args.chatName}(message VARCHAR(8000), sentBy VARCHAR(255), date DATETIME)`;

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Inserted");
    });

  }

};

const server = new ApolloServer({
  typeDefs,
  resolvers,

  context: async ({ req }) => {
    const token = await req.headers["authentication"];
    let user;
    try {
      user = await jwt.verify(token, SECRET);
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
