
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

function getMovieAndSearch(event) {
  if (event) event.preventDefault()
  console.log(event.target)

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

function getMovie(movieName) {
  fetch(`https://movie-database-alternative.p.rapidapi.com/?s=${movieName}&r=json&page=1`, options)
    .then(response => response.json())
    .then(data => {
      searchTitleEl.text(" " + movieName);
      //console.log(response.Search[0]);
      //let resultEl = $('<div>').text('test');
      const list = document.getElementById("result-content");

      while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
      }

      for (var i = 0; i < data.Search.length; i++) {
        //console.log(response.Search);
        let resultText = (data.Search[i].Title + " " + data.Search[i].Year);
        let textEl = $('<p>').text(resultText).addClass('col-12 searchTitle');
        let posterEl = $("<span>")
        if (data.Search[i].Poster !== "N/A") {
          posterEl = $('<img>').attr("src", data.Search[i].Poster).addClass('col -12 poster');
        }
        let saveToWatchListButton = $("<button>").text("Add to watchlist");

        let resultEl = $('<div>').append(textEl).append(posterEl).append(saveToWatchListButton).on("click", addToWatchList);
        // resultEl;
        resultsEl.append(resultEl);
      }
    })
    .catch(err => console.error(err));
}

searchForm.addEventListener('submit', getMovieAndSearch);

let addToWatchList = (event) => {
  event.preventDefault();

  let movieObject = {
    title: event.currentTarget.children[0].textContent,
    picture: event.currentTarget.children[1].src
  }
  //let title = event.currentTarget.children[0].textContent;
  //let picture = event.currentTarget.children[1].src;
  watchlist.push(movieObject)
  updateWatchlist()
}


//Previous movie search saved to local storage
function storeSearch() {
  localStorage.setItem("movieSearch", JSON.stringify(movieSearch));
};

function renderSearch() {
  
  previousSearch.innerHTML = "";
  for (var i = 0; i < movieSearch.length; i++) {
    var singleSearch = movieSearch[i];
    var btn = document.createElement("button");
    btn.setAttribute("class", "get-info");
    btn.setAttribute("id", "get-info");
    var btn2 = document.createElement("button");
    btn.textContent = singleSearch;
    btn2.textContent = "X"
    btn.setAttribute("data-movie", movieSearch[i]);
    btn2.setAttribute("class", "delete-me");
    btn2.setAttribute("data-idx", i);
    previousSearch.appendChild(btn)
    previousSearch.appendChild(btn2)
  }
};

previousSearch.addEventListener('click', function (event) {
  if (event.target.matches(".delete-me")) {
    const idx = event.target.getAttribute("data-idx");
    movieSearch.splice(idx, 1);
    renderSearch();
    storeSearch();
  } else if (event.target.matches(".get-info")) {
    // const movieName = event.target.getAttribute("data-movie")
    movieInput.value = "";
    // console.log('click', event.target.getAttribute("data-movie"))
    getMovieAndSearch(event)
  }
});


//Clear list on HTML
clearBtn.addEventListener("click", function () {
  localStorage.removeItem("movieSearch");
  previousSearch.innerHTML = "";
  movieSearch = [];
});

function updateWatchlist() {
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

function startApp() {
  watchlist = JSON.parse(localStorage.getItem("watchlist"))
  movieSearch = JSON.parse(localStorage.getItem("movieSearch"))
  if (!watchlist) watchlist = []
  if (!movieSearch) movieSearch = []
  console.log("watchlist retrieved from storage")
  renderSearch()
}


function displayMovieCards(){
  for( var i = 0; i < watchlist.length; i++ ) {
    var title = watchlist[i].title;
    var picture = watchlist[i].picture;
    


    var image = $('<img>').attr("src", picture);
    var movieCard = $("<li>").addClass("glide__slide").append(image);
    // var movieCard = $("<li class=glide__slide>" + "<img src=" + picture + "</li>")
 
    // var movieCard = $("<li>").addClass("glide__slide").append("<img>").attr("src", picture)

    slides.append(movieCard + image)
    console.log(picture)
  }
  
}


startApp()

displayMovieCards()





// add an event listener for when someone CLICKS in the previous Search area
// see if the item clicked was a button 
// get the custom attribute of that button -- that will tell you where that movie is in the array



//Functions
//function to get API --DONE
//function to populate search results  --DONE
//function to add button for adding to playlist --DONE
//function to store playlist in local storage --DONE
//function to remove from playlist
//function to plug images from movie in to scrolling playlist





//Event Listeners
//Event listener for search button click  --DONE
//Event Listener for  going to my playlist button click
//Event listener to add a movie to playlist --DONE