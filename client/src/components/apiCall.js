// URL for searching with keyword

let keyword = 'movie';

let url = 'https://api.themoviedb.org/3/search/movie?api_key=6d3aad0cfe43a6f1900888b591f48490&language=en-US&page=1&include_adult=false&query='+keyword;

fetch(url)
.then((response) => response.json())
.then((data) => console.log(data));

