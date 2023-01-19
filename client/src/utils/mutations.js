import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_REVIEW = gql`
mutation addReview($author: ID!, $film: ID!, $review: String!, $rating: Int!) {
  addReview(author: $author, film: $film, review: $review, rating: $rating) {
    film {
      title
    }
    rating
    review
  }
}`;

export const REMOVE_REVIEW = gql`
mutation removeReview($reviewId: ID!) {
  removeReview(reviewId: $reviewId) {
    reviewId
    author {
      _id
      email
      username
    }
  }
}`;

export const ADD_FILM = gql`
mutation addFilm($filmId: ID!, $title: String!, $description: String!) {
  addFilm(filmId: $filmId, title: $title, description: $description) {
    description
    title
  }
}`;

export const EDIT_REVIEW = gql`
mutation editReview($reviewData: ReviewInput!) {
  editReview(reviewData: $reviewData) {
    author {
      _id
      email
      username
    }
    film {
      title
      filmId
      description
    }
    reviewId
    review
    rating
  }
}`;
