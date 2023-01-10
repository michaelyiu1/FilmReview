const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '091876c65bmsh1c266459c48baf4p147737jsn3256a7bf28db',
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
};

fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=game%20of%20thr', options)
	.then(response => response.json())
	.then(data => {
		const list = data.d;

		list.map((item)=> {
			const name = item.l; 
			const poster = item.i.imageUrl;
			const movie = `<li><img src="${poster}"><h2>${name}</h2>></li>`
			document.querySelector('.movies').innerHTML += movie;
		})
	})
	.catch(err => console.error(err));
    