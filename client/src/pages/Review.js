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
  Col
} from 'react-bootstrap';
import MovieContext from '../utils/MovieContext';
import { saveFilm, getSavedFilm } from '../utils/localStorage';

const Reviews = () => {

  // create state to hold saved film values
    const [savedFilm, setSavedFilm] = useState(getSavedFilm());

  // create state for holding our review field data
  const [reviewInput, setReviewInput] = useState('');
  const [similarMovies, setSimilarMovies] = useState('');
  const { loading, data } = useQuery(GET_FILM_REVIEWS);
  const [removeReview, { remove_error }] = useMutation(REMOVE_REVIEW);
  const [addReview, { add_error }] = useMutation(ADD_REVIEW);
  const reviewData = data?.me || {};

    // create method to add a review and set state on form submit
    const handleFormSubmit = async (event) => {
      event.preventDefault();

      console.log(reviewInput);

      // const { data } = await addReview({
      //     filmId: savedFilm.filmId,
      //     review: reviewInput });
  
    };

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

  // create method to search for books and set state on form submit
  const getSimilarMovies = async () => {

    const url = 'https://api.themoviedb.org/3/movie/' + savedFilm.filmId + '/similar?api_key=6d3aad0cfe43a6f1900888b591f48490&language=en-US&page=1';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      const { results } = await response.json();
      console.log(results);

      setSimilarMovies(results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
     <img src={savedFilm.image} className="movie-poster"/>
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

        <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={10} md={8}>
                <Form.Control
                  name="reviewInput"
                  value={reviewInput}
                  onChange={(e) => setReviewInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Add a review for this film!"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Review
                </Button>
              </Col>
            </Form.Row>
          </Form>



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
