let searchInput = document.getElementById('search-movies');
let moviesContainer = document.getElementById('movies-container');

const API_KEY = `49be7073`;
const BASE_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}`;

//Creating a debounce function for optimization....
//debounce is a very good example of Closures
const debounce =(fn, delay)=>{
    let timer;
    return function(){
        timer && clearTimeout(timer);
        //if timer is not defined, set  it run the function after delay
        timer = setTimeout(() => {
            fn();
        }, delay);
    }
}

async function fetchMovies(){
    const response = await fetch(`${BASE_URL}&s=${searchInput}`);
    const data = await response.json();

    const { Response, Search} = data;

    Response === "False" ? responseIsFalse() : displayMoviesContainer(Search);
    console.log(data);
}

const debouncedfunction = debounce(fetchMovies, 1000);

searchInput.addEventListener("input", debouncedfunction);


//HELPER FUNCTIONS:

function displayMoviesContainer(Search){
    moviesContainer.innerHTML = "";
    Search.forEach((movie) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<img src="${movie.Poster}" alt="${movie.Title}"/>
        <div class="card-body">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        </div>`;
        moviesContainer.appendChild(card);
    })
}

function responseIsFalse(){
    moviesContainer.innerHTML = `<h2>No movies found for your search "${searchInput.value}"</h2>`;
}
