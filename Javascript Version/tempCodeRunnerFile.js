con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});