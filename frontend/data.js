export async function fetchMoviesJSON() {
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
// fetchMoviesJSON().then(obj => {
// 	// Array of items
// 	let items = obj.ITEMS; 
// 	items.forEach(movie => {
// 		console.log(movie.title + ': ' + movie.synopsis)
// 	});
// });
