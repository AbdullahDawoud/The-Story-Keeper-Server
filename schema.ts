import {
    graphql,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList
} from 'graphql';
import { authors, books } from './data';

const BookType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        posterUrl: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authors.find((a) => a.id == parent.authorId);
            }
        }
    })
});

const AuthorType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books.filter((a) => a.authorId == parent.id);
            }
        }
    })
});

export const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return books.find((a) => a.id == args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return authors.find((a) => a.id == args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            args: { authorId: { type: GraphQLID } },
            resolve(parent, args) {
                if (args.authorId) return books.filter((b) => b.authorId == args.authorId);

                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
});

export const schema = new GraphQLSchema({
    query: RootQuery
});
