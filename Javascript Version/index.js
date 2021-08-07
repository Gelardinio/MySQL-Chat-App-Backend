const { ApolloServer, gql } = require('apollo-server');
var mysql = require('mysql2');
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

const SECRET = "98ASD908Gjfal93gn398!?44345"

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
    addBook(text: String, author: String): Message
    getMessage(table: String): MessageList
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
      console.log(context.user)
      return context.user.user
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

      const user = {
        username: args.username,
        email: args.email,
        password: pass
      }

      return user

    },

    login: async (parent, args, context) => {
      
     /* var sql = `SELECT COUNT(1) FROM users WHERE email = ${args.email}`

      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      }); */

      var hashPass = '';

      /*function get_info() {
        con.query(`SELECT * FROM users WHERE email = '${args.email}'`, function (err, result, fields) {
          if (err) throw err;
          
          bcrypt.compare(args.password, result[0].password, (error, res) => {
            console.log('Compared result', res) 
          })

          return result[0].password

        });
      }*/

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
