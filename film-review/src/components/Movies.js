
import React from 'react';

function Movies({ movies }) {

  const { name, link, description } = movies;

  return (
    <div className="movies" key={name}>
   
    </div>
  );
}

export default Movies;