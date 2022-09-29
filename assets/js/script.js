
//Global variables
var movieInput = document.getElementById('search-movie');
var searchForm = document.getElementById('searchForm')
let movieSearch = [];
let previousSearch = document.getElementById('previous-search');
let resultsEl = $("#result-content");

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
  movieSearch.push(movie)
  storeSearch()
  renderSearch()

  fetch(`https://movie-database-alternative.p.rapidapi.com/?s=${movie}&r=json&page=1`, options)
    .then(response => response.json())
    .then(response => {
      //console.log(response.Search[0]);
      //let resultEl = $('<div>').text('test');
      for (var i = 0; i < response.Search.length; i++) {
        let result = JSON.stringify(response.Search[i])
        let resultEl = $('<div>').text(result);
        resultsEl.append(resultEl);
      }
      
      //resultsEl.append($('<div>').text(response));
    })
    .catch(err => console.error(err));

}

searchForm.addEventListener('submit', getMovie);


//Previous movie search saved to local storage
function storeSearch() {
  localStorage.setItem("movieSearch", JSON.stringify(movieSearch));
};

function renderSearch() {
  var prevSearch = JSON.parse(localStorage.getItem("movieSearch"))
  if (prevSearch) {
    movieSearch = prevSearch
  } else {
    movieSearch = []
  }
  previousSearch.innerHTML = "";
  for (var i = 0; i < movieSearch.length; i++) {
    var singleSearch = movieSearch[i];
    var div = document.createElement("div");
    var pTag = document.createElement("p");
    var btn = document.createElement("button");
    btn.textContent = "Add To Watch List"
    pTag.textContent = singleSearch;
    div.appendChild(pTag);
    div.appendChild(btn);
    btn.setAttribute("data-index", i);
    previousSearch.appendChild(div)
  }
};

previousSearch.addEventListener('submit', function (event) {
  event.preventDefault();
  var movieVal = movieInput.value.trim();
  movieSearch.push(movieVal)
  storeSearch()
  renderSearch()
});

// add an event listener for when someone CLICKS in the previous Search area
// see if the item clicked was a button 
// get the custom attribute of that button -- that will tell you where that movie is in the array



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

