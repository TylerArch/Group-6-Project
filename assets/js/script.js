
//Global variables
var movieInput = document.getElementById('search-movie');
var searchForm = document.getElementById('searchForm')
let movieSearch = [];
let previousSearch = document.getElementById('previous-search');
let resultsEl = $("#result-content");
let searchTitleEl = $("#result-text");
var clearBtn = document.getElementById('clearBtn')
var slides = document.querySelector(".glide__slides")

var watchlist = [];

//Add Api
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'fb53f80559msh64210164d6f770ap187dbfjsne3fdc83b8748',
    'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
  }
};

function getMovie(event, previousMovie) {
  event.preventDefault();
  let movie = movieInput.value || previousMovie
  console.log(movie)
  movieSearch.push(movie)
  storeSearch()
  renderSearch()

  fetch(`https://movie-database-alternative.p.rapidapi.com/?s=${movie}&r=json&page=1`, options)
    .then(response => response.json())
    .then(response => {
      searchTitleEl.text(" " + movie);
      //console.log(response.Search[0]);
      //let resultEl = $('<div>').text('test');
      const list = document.getElementById("result-content");

      while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
      }
      for (var i = 0; i < response.Search.length; i++) {
        //console.log(response.Search);
        let resultText = (response.Search[i].Title + " " + response.Search[i].Year);
        let textEl = $('<p>').text(resultText).addClass('col-12 searchTitle');
        let posterEl = $('<img>').attr("src", response.Search[i].Poster).addClass('col -12 poster');
        let saveToWatchListButton = $("<button>").text("Add to watchlist");

        let resultEl = $('<div>').append(textEl).append(posterEl).append(saveToWatchListButton).on("click", addToWatchList);
        resultEl;
        resultsEl.append(resultEl);
      }
    })
    .catch(err => console.error(err));

}

searchForm.addEventListener('submit', getMovie);

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
  var prevSearch = JSON.parse(localStorage.getItem("movieSearch"))
  if (prevSearch) {
    movieSearch = [...new Set(prevSearch)]
  } else {
    movieSearch = []
  }
  previousSearch.innerHTML = "";
  for (var i = 0; i < movieSearch.length; i++) {
    var singleSearch = movieSearch[i];
    var btn = document.createElement("button");
    btn.textContent = singleSearch;
    //var pTag = document.createElement("p");
    //var btn = document.createElement("button");
    //btn.textContent = "Add To Watch List"
    //pTag.textContent = singleSearch;
    //div.appendChild(pTag);
    //div.appendChild(btn);
    btn.setAttribute("data-movie", movieSearch[i]);
    previousSearch.appendChild(btn)
  }
};

previousSearch.addEventListener('click', function (event) {
  movieInput.value = "";
  console.log('click', event.target.getAttribute("data-movie"))
  getMovie(event, event.target.getAttribute("data-movie"))
});


//Clear list on HTML
clearBtn.addEventListener("click", function () {
  previousSearch.innerHTML = "";
  movieSearch = [];
});

function updateWatchlist() {
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

function startApp() {
  watchlist = JSON.parse(localStorage.getItem("watchlist"))
  if( !watchlist ) watchlist = []
  console.log("watchlist retrieved from storage")
}


function displayMovieCards(){
  for( var i = 0; i < watchlist.length; i++ ) {
    var title = watchlist[i].title;
    var picture = watchlist[i].picture;
    
    var movieCard = document.createElement(li)
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