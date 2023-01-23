import '../App.css';
import { useState, useEffect } from "react";
import moviePoster from '../Images/movie-poster.jpg'

const Home = () => {

  return (
    <div className=''>
   <title>Movies For You!</title>
      <img src={moviePoster} />
    </div>
  );
};

export default Home;



