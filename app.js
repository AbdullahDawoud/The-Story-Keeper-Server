const express = require("express");
const graphqlHttp = require("express-graphql").graphqlHTTP;
const schema = require("./schema");
const app = express();

app.use(
  "/graphql",
  graphqlHttp({ schema, rootValue: schema.Query, graphiql: true })
);

app.listen(4000, () => {
  console.log("Listening on port 4000 ...");
});
