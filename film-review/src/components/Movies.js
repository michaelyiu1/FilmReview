
import React from 'react';

function Movies({ movies }) {

  const { name, link, description } = movies;

  return (
    <div className="movies" key={name}>
      <h1>hello world</h1>
   
    </div>
  );
}

export default Movies;