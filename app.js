const express = require("express");
const graphqlHttp = require("express-graphql").graphqlHTTP;
const schema = require("./schema");
const app = express();
const cors = require("cors");

app.options(
  "*",
  cors({ origin: "http://localhost:8000", optionsSuccessStatus: 200 })
);

app.use(cors({ origin: "http://localhost:8000", optionsSuccessStatus: 200 }));

app.use(
  "/graphql",
  graphqlHttp({ schema, rootValue: schema.Query, graphiql: true })
);

app.listen(4000, () => {
  console.log("Listening on port 4000 ...");
});
