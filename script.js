
const api_key = "76141265e0c54446c6b48375ec8198e7";
const limit = 1;
let offset = 0;
const base = "https://image.tmdb.org/t/p/w500/";

let pageNumber = 1;

let posterList = document.querySelector("#container");
let searchTerm = document.querySelector("#searchTerm");
const showMoreMovies = document.querySelector("#showMore");
const clearMovies = document.querySelector("#clear")
const searchButton = document.querySelector("#search");
let prevSearch = "";
let movieName = "";

async function MovieList(){
    console.log(searchTerm.value)
    let apiUrl =`https://api.themoviedb.org/3/search/multi?api_key=${api_key}&language=en-US&query=${searchTerm.value}&page=${pageNumber}&include_adult=false`;
    //https://api.themoviedb.org/3/search/multi?api_key=76141265e0c54446c6b48375ec8198e7&language=en-US&query=batman&page=1&include_adult=false
    console.log(apiUrl);
    const response = await fetch(apiUrl);
    const responseData = await response.json();
    const result = responseData.results;
    console.log("response is: ", response);
    console.log("responseData is: ", responseData);
    console.log("result is: ", result);
    if(prevSearch != searchTerm.value){
        pageNumber = 1;
        posterList.innerHTML = "";
        prevSearch = searchTerm.value;
    }
    displayMovies(result);
    console.log("pageNumber: " + pageNumber);
    showMoreMovies.classList.remove("hidden");
    clearMovies.classList.remove("hidden");
    prevSearch = searchTerm.value;
}

function moreMovieList(){
    pageNumber++;
    MovieList();
}


async function startingMovieList(){
    let apiUrl =`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&page=1`;
    console.log(apiUrl);
    const response = await fetch(apiUrl);
    const responseData = await response.json();
    const result = responseData.results;
    console.log("response is: ", response);
    console.log("responseData is: ", responseData);
    console.log("result is: ", result)
    displayMovies(result);
    console.log("pageNumber: " + pageNumber);
}

function displayMovies(result){
    console.log(result[0].poster_path)
    result.forEach((backdrop_path,index) => {
        if(result[index].poster_path != null){
            if(result[index].title == undefined){
                movieName =result[index].original_name;
            }
            else
            {movieName =result[index].title}
        posterList.innerHTML += ` 
        <li class ="card" onclick = "movieInformation()">
            <img id ="icon" src = " ${base + result[index].poster_path}" alt = "Images">
            <h2>${movieName}</h2>
            <div>
                <p>Rating: ${result[index].vote_average} / 10</p>
            </div>
        </li>
    `
        }

})

}

async function movieInformation(){
    console.log("clicked")
    //fix this tomorrow

}

window.onload = function(){
    startingMovieList();
    searchButton.addEventListener('click', (e) => {
        e.preventDefault()
        MovieList();});
    showMoreMovies.addEventListener('click', (e) => {
        e.preventDefault()
        moreMovieList();});
    clearMovies.addEventListener('click', (e) => {
        e.preventDefault()
        posterList.innerHTML = "";
        startingMovieList();});    
}