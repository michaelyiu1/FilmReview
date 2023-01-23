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
  Row,
} from 'react-bootstrap';
import Auth from '../utils/auth';
import MovieContext from '../utils/MovieContext';
import { useMutation } from '@apollo/client';
import { ADD_FILM } from '../utils/mutations';
import { Link } from 'react-router-dom';
import { saveFilm, getSavedFilm } from '../utils/localStorage';
import Review from './Review';

// import { MDBBtn } from "mdb-react-ui-kit";



const Movies = () => {

  const data = useContext(MovieContext);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved bookId values
  const [savedFilm, setSavedFilm] = useState(getSavedFilm());

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
        image: 'https://image.tmdb.org/t/p/w154' + film.poster_path || '',
      }));

      console.log(filmData);

      setSearchedFilms([...filmData]);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

    // create function to handle saving a film to our database
    const handleSaveFilm = async (film) => {
      // find the book in `searchedBooks` state by the matching id
      console.log(film);
      setSavedFilm(film);
      const filmToSave = searchedFilms.find((film) => film.filmId === film.id);
  
      // get token
      const token = Auth.loggedIn() ? Auth.getToken() : null;
  
      if (!token) {
        return false;
      }
  
      try {
        const { data } = await addFilm({
          variables: { filmData: { ...filmToSave } },
        });
       console.log('saving film in local storage');
      } catch (err) {
        console.error(err);
      }
    };

    function test() {
      //data.setCurrentMovie(film)
      console.log('hi');
      // console.log(currentdat'this is moviecontextdata');

    };


// React html
    return (
  
    <MDBCol lg="12">
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={10} md={8}>
       
                <Form.Control 
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a movie"
                  />
              </Col>
              <Col md={12} lg={4}>
                <Button type="submit" variant="success" size="md" center>
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

        <Row>
          {searchedFilms.map((film) => {
            return (
              <Col md={4}>
              
              <Card key={film.filmId} border="dark">
                {film.image ? (
                  <Card.Img
                    src={film.image}
                    alt={`The cover for ${film.title}`}
                    variant="center"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{film.title}</Card.Title>
                  <Card.Text>{film.description}</Card.Text>
                 <Link to='/Review'><Button onClick={() => saveFilm(film)}>Reviews</Button></Link>
                </Card.Body>
              </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </MDBCol>
  

  );
}


export default Movies;

