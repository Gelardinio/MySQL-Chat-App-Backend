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

const SECRET = "98ASD908Gjfal93gn398!?44345";

const typeDefs = gql`

  type Message {
    message: String!
    sentBy: String!
    sendDate: String!
  }

  type Query {
    user: String
    getMessage(chatName: String): [Message]
  }

  type Mutation {
    addMessage(text: String, chatName: String): Message
    createChat(chatName: String otherUser: String): String
    register(username: String! email: String!, password: String!): User!
    login(username: String!, password: String!): String!
  }

  type User {
    username: String
    email: String
    password: String
  }
`;

const resolvers = {
  Query: {
    
    user(parent, args, context, info) {
      if (!context.user) {
        throw new Error("Please log in  to view this information");
      } else {
        console.log(context.user)
        return context.user.user
      }
    }, 

    getMessage: async (parent, args, context, info) => {

      async function getMessages(table) {
        const result = await con.promise().query(`SELECT * FROM ${table}`)
        return result
      }

      var colMessages = await getMessages(args.chatName);

      console.log(colMessages[0][0].date)

      var collection = []

      for (var i = 0; i < colMessages.length; i++) {
          var singleMessage = {
            message: colMessages[0][i].message,
            sentBy: colMessages[0][i].sentBy,
            sendDate: colMessages[0][i].date
          }
          collection.push(singleMessage)
      }
      console.log(collection)
      return collection
    },

  },

  Mutation: {

    addMessage(parent, args, context, info) {
      console.log(args.text)
      var time = new Date().toISOString().slice(0, 19).replace('T', ' ');
      var sql = `INSERT INTO ${args.chatName}(message, sentBy, date) VALUES ('${args.text}', '${context.user.user}', '${time}')`;
      
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Inserted");
      });

      const createdMessage = {
        message: args.text,
        sentBy: context.user.user,
        sendDate: time
      }

      return createdMessage
    },

    register: async (parent, args) => {

      var sql = `SELECT * FROM users WHERE username = '${args.username}'`

      var theResult = 0;

      async function checkValid(username, email) {
        const result = await con.promise().query("SELECT * FROM users WHERE username=? OR email=?", [ username, email ])
        return result[0]
      }

      theResult = await checkValid(args.username, args.email)

      if (theResult.length > 0) {
        throw new Error("Username or/and email already exists")
      }

      pass = await bcrypt.hash(args.password, 12);

      var time = new Date().toISOString().slice(0, 19).replace('T', ' ');

      var sql = `INSERT INTO users (username, email, password, creationDate) VALUES ('${args.username}', '${args.email}', '${pass}', '${time}')`;

      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Inserted");
      });

      //var sql = `CREATE TABLE ${args.email}(chatName VARCHAR(255), otherUser VARCHAR(255), creationDate DATETIME)`;

      var sql = `CREATE TABLE ${args.username}(chatName VARCHAR(255), otherUser VARCHAR(255), creationDate DATETIME)`;

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

      async function get_info(username) {
        const results = await con.promise().query(`SELECT * FROM users WHERE username = '${username}'`)
        return results
        //return results[0]
      }


      theResult = await get_info(args.username)

      if (theResult[0].length < 1) {
        throw new Error("Invalid username");
      }

      const isValid = await bcrypt.compare(args.password, theResult[0][0].password);

      if (!isValid) {
        throw new Error("Incorrect password");
      }

      const token = await jwt.sign(
        {
          user: args.username
        },
        SECRET,
        {expiresIn: "1h" }
      ); 

      console.log(token)

      return token;

    },

    createChat: async (parent, args, context) => {

      if (!context.user) {
        throw new Error("Please log in  to view this information");
      } else {

        var time = new Date().toISOString().slice(0, 19).replace('T', ' ');

        console.log(context.user.user + "BRUGH")

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

        return time;
      } 
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
