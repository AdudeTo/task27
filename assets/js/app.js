const searchField = document.getElementById("searchInput");
const moviesListHolder = document.getElementById("moviesListHolder");
let movieListAPI = "https://api.tvmaze.com/search/";
let movieSearchCriteria = "shows/";
let movieSearchQuery, movieLastSearch, movieCallConstructor; coolDown = 500; coolDownLoading = 0;
let minCharacters = 3;
let returnMessages = [];

returnMessages["notRated"] = "not rated yet";

function printHTML(data) {
    moviesListHolder.innerHTML = "";
    let allItemsCont = data.length;
    data.forEach(async (movie) => {
        if (movie.show.rating.average == null) {
            movie.show.rating.average = returnMessages["notRated"];
        } else {
            movie.show.rating.average = movie.show.rating.average + " stars";
        }
        let item = document.createElement("LI");
        item.innerHTML =
        `
            <figure>
                <img alt="${movie.show.name}" src="${movie.show.image.medium}">
            </figure>
            <h3>${movie.show.name}</h3>
            <h4>Rating: <span>${movie.show.rating.average}</span></h4>
            <h5>${movie.show.genres.join(', ')}</h5>
            ${movie.show.summary}
        `;
        moviesListHolder.appendChild(item);
    });
}

function fetchmovieList(callback) {
    fetch(movieCallConstructor)
        .then(response => response.json())
        .then(json => callback(null, json))
        .catch(error => callback(error, null))
}

function prepareAcall() {
    let getSearchQuery = searchField.value;
    if (searchField.value == movieLastSearch) {
        return;
    }
    if ((getSearchQuery.length >= minCharacters) && !coolDownLoading) {
        movieCallConstructor = `${movieListAPI}${movieSearchCriteria}?q=${getSearchQuery}`;
        fetchmovieList((error, data) => {
            if (error)
                console.log(error);
            else
                movieLastSearch = searchField.value;
                printHTML(data);
        });
        coolDownLoading = 1;
        setTimeout(() => { coolDownLoading = 0; prepareAcall(); }, coolDown);

    }
}

searchField.addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
        coolDownLoading = 0;
    }
    prepareAcall();
});
