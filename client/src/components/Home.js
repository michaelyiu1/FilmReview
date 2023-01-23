import '../App.css';
import { useState, useEffect } from "react";
import moviePoster from '../Images/movie-poster.jpg'

const Home = () => {

  return (
    <div>
      <h1>Movies For You! "MFY"</h1>
      <img src={moviePoster} />
    </div>
  );
};

export default Home;



