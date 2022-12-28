let movieListURL = "https://api.tvmaze.com/search/shows?q=Stargate";


fetchmovieList((error, data) => {
    if (error)
        console.log(error);
    //show loading
    //retry after 10 s max 3~5 times
    //if still error show OPS something is wrong !
    else
       // sortData(data);
       console.log(data);

});

function fetchmovieList(callback) {
    fetch(movieListURL)
        .then(response => response.json())
        .then(json => callback(null, json))
        .catch(error => callback(error, null))
}