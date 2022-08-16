import express from "express";
import { graphqlHTTP } from "express-graphql";
import { RootQuery, schema } from "./schema";
const app = express();
const cors = require("cors");

app.options(
  "*",
  cors({ origin: "http://localhost:8000", optionsSuccessStatus: 200 })
);

app.use(cors({ origin: "http://localhost:8000", optionsSuccessStatus: 200 }));

app.use(
  "/graphql",
  graphqlHTTP({ schema, rootValue: RootQuery, graphiql: true })
);

app.listen(4000, () => {
  console.log("Listening on port 4000 ...");
});
