
//Global variables
var movieInput = document.getElementById('search-movie');
var searchForm = document.getElementById('searchForm')
let movieSearch = [];
let previousSearch = document.getElementById('previous-search');
let resultsEl = $("#result-content");
let searchTitleEl = $("#result-text");
var clearBtn = document.getElementById('clearBtn')
var slides = document.getElementById("slides")

var watchlist = [];

//Add Api
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'fb53f80559msh64210164d6f770ap187dbfjsne3fdc83b8748',
    'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
  }
};


//Previous movie search saved to local storage
function storeSearch() {
  localStorage.setItem("movieSearch", JSON.stringify(movieSearch));
};



function updateWatchlist() {
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

function startApp() {
  watchlist = JSON.parse(localStorage.getItem("watchlist"))
  movieSearch = JSON.parse(localStorage.getItem("movieSearch"))
  if (!watchlist) watchlist = []
  if (!movieSearch) movieSearch = []
  // console.log("watchlist retrieved from storage")
  // renderSearch()
}


function displayMovieCards(){
  for( var i = 0; i < watchlist.length; i++ ) {
    var title = watchlist[i].title;
    var picture = watchlist[i].picture;
    
    // building HTML elements and appending them

    var movieCard = document.createElement("li");
    movieCard.setAttribute("class", "glide__slide");
    var image = document.createElement("img");
    image.src = picture;
    var remove = document.createElement("button");
    remove.setAttribute("id", "clearBtn");

   
    movieCard.appendChild(image, remove)
    slides.append(movieCard)
 
  }
  
}


startApp()

displayMovieCards()
