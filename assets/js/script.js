// Variables
var movieInput = document.getElementById('search-movie');
var searchForm = document.getElementById('searchForm')

//Add Api
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'fb53f80559msh64210164d6f770ap187dbfjsne3fdc83b8748',
    'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
  }
};

function getMovie(event) {
  event.preventDefault();
  const movie = movieInput.value
  console.log(movie)
  fetch(`https://movie-database-alternative.p.rapidapi.com/?s=${movie}&r=json&page=1`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}

searchForm.addEventListener('submit', getMovie);
console.log("hello")
//DOM Elements


//Global Variables


//Functions
//function to get API
//function to populate search results
//function to add button for adding to playlist
//function to store playlist in local storage
//function to remove from playlist
//function to plug images from movie in to scrolling playlist





//Event Listeners
//Event listener for search button click
//Event Listener for  going to my playlist button click
//Event listener to add a movie to playlist

