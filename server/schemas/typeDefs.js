const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    reviewCount: Int
    reviews: [Review]
  }

  type Film {
    filmId: ID!
    title: String!
    description: String!
    reviews: [Review]
  }

  type Review {
    reviewId: ID!
    filmId: Int!
    filmTitle: String!
    author: User
    film: Film
    review: String!
    rating: Int!
  }

  type Auth {
    token: ID!
    user: User
  }

  input ReviewInput {
    reviewId: ID!
    author: ID!
    film: ID!
    review: String!
    rating: Int!
  }

  type Query {
    me: User
    getAllUsers: [User]
    findOneFilm: Film
    getFilmReviews: [Review]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addReview(author: ID!, filmId: Int!, filmTitle: String!, review: String!, rating: Int!): Review
    editReview(reviewData: ReviewInput!): Review
    removeReview(reviewId: ID!): Review
    addFilm(filmId: ID!, title: String!, description: String!): Film  
  }
`;

module.exports = typeDefs;
