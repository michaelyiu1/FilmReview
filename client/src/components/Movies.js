import { MDBCol } from "mdbreact";
import React, { useState, useEffect, useContext } from 'react';
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from 'react-bootstrap';
import Auth from '../utils/auth';
import MovieContext from '../utils/MovieContext';
import { useMutation } from '@apollo/client';
import { ADD_FILM } from '../utils/mutations';
import { Link } from 'react-router-dom';

const Movies = () => {

  const data = useContext(MovieContext);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved bookId values
  // const [savedFilmIds, setSavedFilmIds] = useState(getSavedFilmIds());

  // create state for holding returned movie api data
    const [searchedFilms, setSearchedFilms] = useState([]);

    const [addFilm, {error}] = useMutation(ADD_FILM);


  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=6d3aad0cfe43a6f1900888b591f48490&language=en-US&page=1&include_adult=false&query=${searchInput}`
      );

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { results } = await response.json();

      const filmData = results.map((film) => ({
        filmId: film.id,
        title: film.title,
        description: film.overview,
        image: film.poster_path || '',
      }));

      console.log(filmData);

      setSearchedFilms([...filmData]);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

    // create function to handle saving a film to our database
    const handleSaveFilm = async (filmId) => {
      // find the book in `searchedBooks` state by the matching id
      const filmToSave = searchedFilms.find((film) => film.filmId === filmId);
  
      // get token
      const token = Auth.loggedIn() ? Auth.getToken() : null;
  
      if (!token) {
        return false;
      }
  
      try {
        const { data } = await addFilm({
          variables: { filmData: { ...filmToSave } },
        });
        //console.log(savedFilmIds);
       // setSavedFilmIds([...savedFilmIds, filmToSave.filmId]);
      } catch (err) {
        console.error(err);
      }
    };


// React html
    return (
    
    <MDBCol md="8">
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a movie"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>

      <Container>
        <h2>
          {searchedFilms.length
            ? `Viewing ${searchedFilms.length} results:`
            : 'Search for a film to begin'}
        </h2>
        <CardColumns>
          {searchedFilms.map((film) => {
            return (
              <Card key={film.filmId} border="dark">
                {film.image ? (
                  <Card.Img
                    src={film.image}
                    alt={`The cover for ${film.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{film.title}</Card.Title>
                  <Card.Text>{film.description}</Card.Text>
                 {/*{Auth.loggedIn() && (
                    // <Button
                    //   disabled={savedFilmIds?.some(
                    //     (savedId) => savedId === film.filmId
                    //   )}
                    //   className="btn-block btn-info"
                    //   // onClick={() => handleSaveFilm(film.filmId)}
                    // >
                    //   {savedFilmIds?.some((savedId) => savedId === film.filmId)
                    //     ? 'Check out the reviews!'
                    //     : 'Review This Film!'}
                    // </Button>
                 //)}*/}
                 <Button to="/Review" onClick={() => data.setCurrentMovie(film)} ><Button>Reviews</Button></Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </MDBCol>

  );
}

export default Movies;

