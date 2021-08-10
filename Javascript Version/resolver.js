var mysql = require('mysql2');
var bcrypt = require('bcrypt')

export const resolvers = {
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
  
    }
  
};