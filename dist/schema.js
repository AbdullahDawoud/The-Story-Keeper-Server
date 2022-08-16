"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.RootQuery = void 0;
const graphql_1 = require("graphql");
const data_1 = require("./data");
const BookType = new graphql_1.GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        genre: { type: graphql_1.GraphQLString },
        posterUrl: { type: graphql_1.GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return data_1.authors.find((a) => a.id == parent.authorId);
            }
        }
    })
});
const AuthorType = new graphql_1.GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        age: { type: graphql_1.GraphQLInt },
        books: {
            type: new graphql_1.GraphQLList(BookType),
            resolve(parent, args) {
                return data_1.books.filter((a) => a.authorId == parent.id);
            }
        }
    })
});
exports.RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return data_1.books.find((a) => a.id == args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return data_1.authors.find((a) => a.id == args.id);
            }
        },
        books: {
            type: new graphql_1.GraphQLList(BookType),
            args: { authorId: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                if (args.authorId)
                    return data_1.books.filter((b) => b.authorId == args.authorId);
                return data_1.books;
            }
        },
        authors: {
            type: new graphql_1.GraphQLList(AuthorType),
            resolve(parent, args) {
                return data_1.authors;
            }
        }
    }
});
exports.schema = new graphql_1.GraphQLSchema({
    query: exports.RootQuery
});
