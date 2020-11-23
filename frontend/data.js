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

export let movieObjects = []; // Global array of movie objects
let movieTitles = [];
let movieImages = [];
let movieDescription = [];
let movieRatings = [];
let movieTypes = [];
let movieRuntimes = [];

const myList = document.querySelector('ul');
const start = document.getElementById('start');

function cardCreator(movie) {
	return `
	<div class="column is-one-quarter">
			<div class="card" id="test">
				<div class="container has-text-centered">
				<div class="card-image">
					<figure>
						<img style="border: 2px solid white" src="${movie.image}" alt="Placeholder image">
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

		movieObjects.push(movie);
		movieTitles.push(movie.title);
		movieImages.push(movie.image);
		movieDescription.push(movie.synopsis);
		movieRatings.push(movie.rating)
		movieRuntimes.push(movie.runtime)
		movieTypes.push(movie.type)

		let listyItem = `<p> ${movie.title}</p>`
		let item = cardCreator(movie)
		$('#movies').append(item);
	});
});

const handlePlayNow = function (event) {
	// Save ID of user
	// let userID =
	// render form based on this ID
	// let form = renderForm(userID)
	// $(this).parent().append(form)
	let form = renderForm();
	$('#renderForm').append(form);

}

const handleSelect = function (event) {
	// Retrieve answers to form
	var sel = document.getElementById('userMovies');
	let selectedMovie = sel.value;
	console.log(selectedMovie)
	let movieIndex;
	for (let i = 0; i < movieTitles.length; i++) {
		if (selectedMovie == movieTitles[i]) {
			movieIndex = i;
		}
	}
	let selectedForm = renderSelected(movieIndex)
	$('#renderForm').append(selectedForm);
}

const submitMovies = function (event) {
	$('#renderForm').empty();
}



const renderSelected = function (movieIndex) {
	return `
	<div class="column is-two-thirds">
			<div class="card" id="test">
				<div class="container has-text-centered">
				<div class="card-image">
					<figure>
						<img src="${movieImages[movieIndex]}" alt="Placeholder image">
					</figure>
				</div>
				</div>
				<div class="card-content">
					<div class="media">
						<div class="media-content">
							<p class="title is-4">${movieTitles[movieIndex]}</p>
						</div>
					</div>

					<div class="content">
						<p> ${movieDescription[movieIndex]}</p>
					</div>
					
					<div>
					<p> <strong> Rating: </strong> ${movieRatings[movieIndex]}</p> 
					</div>

					<div>
					<p> <strong> Runtime: </strong> ${movieRuntimes[movieIndex]}</p> 
					</div>
				
					<p> Add matched users below here </p>
			</div>
	</div>
	`
}

const renderForm = function (userID) {
	return `
		<div class="column is-one-third">
		<div class="select is-multiple">
			<section class="hero is-danger is-bold">
				<div hero-body>
					<h1 class="title is-3 has-text-centered"> Select a movie you would watch with a friend! </h1>
				</div>
			</section>
			<div id="selection">
			<select class = "has-text-centered" id="userMovies" multiple size="20">
				<option name="${movieTitles[0]}"> ${movieTitles[0]} </option>
				<option name="${movieTitles[1]}"> ${movieTitles[1]} </option>
				<option name="${movieTitles[2]}"> ${movieTitles[2]} </option>
				<option name="${movieTitles[3]}"> ${movieTitles[3]} </option>
				<option name="${movieTitles[4]}"> ${movieTitles[4]} </option>
				<option name="${movieTitles[5]}"> ${movieTitles[5]} </option>
				<option name="${movieTitles[6]}"> ${movieTitles[6]} </option>
				<option name="${movieTitles[7]}"> ${movieTitles[7]} </option>
				<option name="${movieTitles[8]}"> ${movieTitles[8]} </option>
				<option name="${movieTitles[9]}"> ${movieTitles[9]} </option>
				<option name="${movieTitles[10]}"> ${movieTitles[10]} </option>
				<option name="${movieTitles[11]}"> ${movieTitles[11]} </option>
				<option name="${movieTitles[12]}"> ${movieTitles[12]} </option>
				<option name="${movieTitles[13]}"> ${movieTitles[13]} </option>
				<option name="${movieTitles[14]}"> ${movieTitles[14]} </option>
				<option name="${movieTitles[15]}"> ${movieTitles[15]} </option>
				<option name="${movieTitles[16]}"> ${movieTitles[16]} </option>
				<option name="${movieTitles[17]}"> ${movieTitles[17]} </option>
				<option name="${movieTitles[18]}"> ${movieTitles[18]} </option>
				<option name="${movieTitles[19]}"> ${movieTitles[19]} </option>
			</select>
			</div>

			<input id="selectionDone" type="submit" value="Go Back">
		  </div>
		  </div>
	`
}

let matches = [];

let debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

let search = debounce(function(event){
	let text = event.target.value;	
	getValues(text)
	.then((list)=>{
		if( list.length == 0){
			$('#autocompleteUL').empty();
			let item = "No matches found"
			$('#autocompleteUL').append(item);
		}else{
			$('#autocompleteUL').empty();
			for (let i = 0; i < list.length; i++) {
				let item = renderListElement(list[i]);
				$('#autocompleteUL').append(item);
			}
		}
	})
	.catch(err=>console.warn(err));
}, 600);

let getValues = function(txt){
	return new Promise((resolve, reject)=>{
		matches = [];
		setTimeout((function(){
			let t = '^' + this.toString();
			let pattern = new RegExp(t, 'i'); 
			let matches = movieTitles.filter(term => pattern.test(term));
			resolve(matches);
		}).bind(txt), 500);
	})
}

let renderListElement = function(title){
	return `
	<li> ${title} </li>
	`
}

$(function () {
	$(document).on("click", '#testSubmit', handlePlayNow)
	$(document).on("click", '#selectionDone', submitMovies)
	$(document).on("click", '#renderForm', handleSelect)
	$(document).on("input", '#searchForm', search)
}); 
