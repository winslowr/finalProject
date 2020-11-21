/*
Manipulate object as desired
	Object has two fields: 
		  1. 'COUNT': Returns the number of movies contained in the 'ITEMS' field

		  2. 'ITEMS': Returns an array of movies with various fields
			  a. 'download'
			  b. 'image': link to movie/tv show image
			  c. 'imdbid': id for imdb
			  d. 'largeimage': link to movie/tv show large image
			  e. 'netflixid' 
			  f. 'rating' 
			  g. 'released': year the move was released
			  h. 'runtime': xhym
			  i: 'synopsis': quick summary of the movie
			  j. 'title'
			  k. 'type': movie or tv show
			  l. 'unogsdate
*/

let movieObjects = []; // Global array of movie objects
let movieTitles = [];
let movieImages = [];
let movieDescription = [];

const myList = document.querySelector('ul');
const start = document.getElementById('start');

function cardCreator(movie) {
	return `
	<div class="column is-one-quarter">
			<div class="card">
				<div class="container has-text-centered">
				<div class="card-image">
					<figure>
						<img src="${movie.image}" alt="Placeholder image">
					</figure>
				</div>
				</div>
				<div class="card-content">
					<div class="media">
						<div class="media-content">
							<p class="title is-4">${movie.title}</p>
						</div>
					</div>

					<div class="content">
						<p> ${movie.synopsis}</p>
					</div>
				</div>
			</div>
	</div>
	`
}

async function fetchMoviesJSON() {
	const response = await fetch("https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get%3Anew7%3AUS&p=1&t=ns&st=adv", {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "1119f077a7msh6ed3381feb84700p1e65c9jsn0a49cf7dca25",
			"x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com"
		}
	})
	const obj = await response.json();
	return obj;
}

fetchMoviesJSON().then(obj => {
	let items = obj.ITEMS;
	items = items.sort((a, b) => {   // Sort movies newest first
		let dateA = Date.parse(a.unogsdate);
		let dateB = Date.parse(b.unogsdate);
		let comparison = 0;
		if (dateA > dateB) {
			comparison = -1;
		} else if (dateA < dateB) {
			comparison = 1;
		}
		return comparison;
	});
	items.forEach(movie => {
		/*
		movieObjects.push(movie);
		movieTitles.push(movie.title);
		movieImages.push(movie.image);
		movieDescription.push(movie.synopsis);
		*/

		let listyItem = `<p> ${movie.title}</p>`
		let item = cardCreator(movie)
		$('#movies').append(item);
	});
});

let handleClick = function(){
	$('#movies').append(`<p> Yo </p>`)
}

$(function () {
	$(document).on("click",'#testSubmit', handleClick)
}); 
