"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./schema");
const app = (0, express_1.default)();
const cors = require("cors");
app.options("*", cors({ origin: "http://localhost:8000", optionsSuccessStatus: 200 }));
app.use(cors({ origin: "http://localhost:8000", optionsSuccessStatus: 200 }));
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({ schema: schema_1.schema, rootValue: schema_1.RootQuery, graphiql: true }));
app.listen(4000, () => {
    console.log("Listening on port 4000 ...");
});
