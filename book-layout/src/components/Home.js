import React from 'react'
import moviePoster from '../Images/movie-poster.jpg';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <img src={moviePoster} className="movie-poster"/>
    </div>
  )
}
