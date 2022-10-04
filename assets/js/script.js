
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

// Options for API
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'fb53f80559msh64210164d6f770ap187dbfjsne3fdc83b8748',
    'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
  }
};

// Takes the movie title searched and creates an entry in the previous search list if not already there.
// Then calls the fetch (getMovie) function
function getMovieAndSearch(event) {
  if (event) event.preventDefault()

  let movieName
  if (event.target.getAttribute("id") === "searchForm") {
    movieName = movieInput.value
    if (!movieSearch.includes(movieName)) movieSearch.push(movieName)
    storeSearch()
    renderSearch()
  } else if (event.target.getAttribute("id") === "get-info") {
    movieName = event.target.getAttribute("data-movie")
  }
  getMovie(movieName)
}

// Retrieves movie info from the api using the movieName variable and creates a list of results
function getMovie(movieName) {
  fetch(`https://movie-database-alternative.p.rapidapi.com/?s=${movieName}&r=json&page=1`, options)
    .then(response => response.json())
    .then(data => {
      searchTitleEl.text(" " + movieName);
      const list = document.getElementById("result-content");

      while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
      }

      // This for loop reads from the result from fetch and builds a list of the search results
      for (var i = 0; i < data.Search.length; i++) {
        let resultText = (data.Search[i].Title + " " + data.Search[i].Year);
        let textEl = $('<p>').text(resultText).addClass('col-12 searchTitle');
        let posterEl = $("<span>")
        if (data.Search[i].Poster !== "N/A") {
          posterEl = $('<img>').attr("src", data.Search[i].Poster).addClass('col -12 poster');
        }
        let saveToWatchListButton = $("<button>").text("Add to Watchlist");
        saveToWatchListButton.addClass('saveToWatchButton btn btn-primary');

        let resultEl = $('<div>').append(textEl).append(posterEl).append(saveToWatchListButton).on("click", addToWatchList);
        resultEl.addClass('searchResult d-flex flex-column align-items-center');
        resultsEl.append(resultEl);
      }
    })
    .catch(err => console.error(err));
}

// Event listener for the search list
searchForm.addEventListener('submit', getMovieAndSearch);

let addToWatchList = (event) => {
  event.preventDefault();

  let movieObject = {
    title: event.currentTarget.children[0].textContent,
    picture: event.currentTarget.children[1].src
  }
  watchlist.push(movieObject)
  updateWatchlist()
}


// Previous movie search saved to local storage
function storeSearch() {
  localStorage.setItem("movieSearch", JSON.stringify(movieSearch));
};

// Creates a list of previous searches from the moviesearch array
function renderSearch() {
  previousSearch.innerHTML = "";

  for (var i = 0; i < movieSearch.length; i++) {
    var singleSearch = movieSearch[i];
    let li = document.createElement("li");
    li.className = "prevSearch";
    var btn = document.createElement("button");
    btn.setAttribute("class", "get-info");
    btn.setAttribute("id", "get-info");
    var btn2 = document.createElement("button");
    btn.textContent = singleSearch;
    btn2.textContent = "X"
    btn.setAttribute("data-movie", movieSearch[i]);
    btn2.setAttribute("class", "delete-me");
    btn2.setAttribute("data-idx", i);
    li.append(btn, btn2);
    previousSearch.appendChild(li)
  }
};

// Event listener on the x button to remove a previous search from the previous searches list 
previousSearch.addEventListener('click', function (event) {
  if (event.target.matches(".delete-me")) {
    const idx = event.target.getAttribute("data-idx");
    movieSearch.splice(idx, 1);
    renderSearch();
    storeSearch();
  } else if (event.target.matches(".get-info")) {
    movieInput.value = "";
    getMovieAndSearch(event)
  }
});


//Clear list on HTML
clearBtn.addEventListener("click", function () {
  localStorage.removeItem("movieSearch");
  previousSearch.innerHTML = "";
  movieSearch = [];
});

// Saves watchlist to local storage
function updateWatchlist() {
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

// Creates watchlist and previsous searches from local storage
function startApp() {
  watchlist = JSON.parse(localStorage.getItem("watchlist"))
  movieSearch = JSON.parse(localStorage.getItem("movieSearch"))
  if (!watchlist) watchlist = []
  if (!movieSearch) movieSearch = []
  renderSearch()
}

// Creates and adds slides to the glide using data from the watchlist array
function displayMovieCards(){
  for( var i = 0; i < watchlist.length; i++ ) {
    var title = watchlist[i].title;
    var picture = watchlist[i].picture;
    var image = $('<img>').attr("src", picture);
    var movieCard = $("<li>").addClass("glide__slide").append(image);
    slides.append(movieCard + image)
  }
  
}

startApp()

// This function will not run on index.html
if (slides) {
  displayMovieCards();
}