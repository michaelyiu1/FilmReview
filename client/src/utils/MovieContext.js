import React, { useState, createContext } from 'react';

export const MovieContext = React.createContext();

const MovieProvider = (props) => {
  const [currentMovie, setCurrentMovie] = useState(props);

  return (
    <MovieContext.Provider value={{ currentMovie: currentMovie, setCurrentMovie: setCurrentMovie }} {...props} />
  );
};

export default MovieProvider;