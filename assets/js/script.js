// Variables
var movieInput = document.getElementById('search-movie');
var submitBtn = documnet.getElementById('submitBtn')

//Add Api
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fb53f80559msh64210164d6f770ap187dbfjsne3fdc83b8748',
		'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
	}
};

fetch(`https://movie-database-alternative.p.rapidapi.com/?s=${movieInput}&r=json&page=1`, options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

submitBtn.addEventListener('search');









// function getApi(event) {
//   event.preventDefault()
//   var movieName = movieInput.value
//   //console.log(movieName)
//   var requestUrl = 
// }