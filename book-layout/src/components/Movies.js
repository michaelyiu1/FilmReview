import React from "react";
import { MDBCol } from "mdbreact";
import React, { useState, useEffect } from 'react';
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from 'react-bootstrap';

import { useMutation } from '@apollo/client';

const Movies = () => {

  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');


  // URL for searching with keyword
let keyword = 'movie';
let url = 'https://api.themoviedb.org/3/search/movie?api_key=6d3aad0cfe43a6f1900888b591f48490&language=en-US&page=1&include_adult=false&query='+keyword;
fetch(url)
.then((response) => response.json())
.then((data) => console.log(data));

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

      const { items } = await response.json();

      const filmData = items.map((film) => ({
        filmId: film.id,
        title: film.title,
        description: film.overview,
        image: film.poster_path || '',
      }));

      setSearchInput('');
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
                  placeholder="Search for a book"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
    </MDBCol>

  );
}

export default Movies;

