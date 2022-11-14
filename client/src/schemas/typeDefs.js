const { gql } = require('apollo-server-express');


// below definitions of each variable are guesses based on description
const typeDefs = gql` 
    type User {
        _id: ID
        name: String
        email: String
        bookCount: Int
        savedBooks: []
    }
    
    // image def needs to be revisited
    type Book {
        bookdId: ID
        authors: []
        description: String
        title: String
        image: []
        link: String
    }
    
    type Auth {
        token: String
        user: [User]
    }

    type Mutation{
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(authors: [], description: String!, title: String!, bookId: ID, image: [], link: String!): User
        removeBook(bookId: ID): User
    }
`;

module.exports = typeDefs;
