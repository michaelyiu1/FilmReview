import React, { useState, useEffect, useContext } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { ADD_REVIEW, EDIT_REVIEW, REMOVE_REVIEW, ADD_FILM } from '../utils/mutations';
import { QUERY_ME, GET_FILM_REVIEWS } from '../utils/queries';
import Auth from '../utils/auth';
import { redirect } from "react-router-dom";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from 'react-bootstrap';
import MovieContext from '../utils/MovieContext';
import { saveFilm, getSavedFilm } from '../utils/localStorage';

const Reviews = () => {

    // create state to hold saved bookId values
    const [savedFilm, setSavedFilm] = useState(getSavedFilm());
    console.log(savedFilm);
;
  const { loading, data } = useQuery(GET_FILM_REVIEWS);
  const [removeReview, { error }] = useMutation(REMOVE_REVIEW);

  const reviewData = data?.me || {};

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteReview = async (ReviewId) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeReview({
        variables: { ReviewId },
      });

      // upon success, remove book's id from localStorage
      removeReview(ReviewId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing {savedFilm.title} Reviews</h1>
        </Container>
      </Jumbotron>
      <Container>
      <p>{savedFilm.description}</p>
        <h2>
          {reviewData.review?.length
            ? `Viewing ${reviewData.review.length} saved ${
                reviewData.review.length === 1 ? 'review' : 'reviews'
              }:`
            : 'This film has no reviews yet!'}
        </h2>
        <CardColumns>
          {reviewData.review?.map((review) => {
            return (
              <Card key={review._id} border="dark">
                <Card.Body>
                  <Card.Title>{review.review}</Card.Title>
                  <Card.Text>{review.rating}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteReview(review._id)}
                  >
                    Delete this Review
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default Reviews;
