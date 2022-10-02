const express = require('express');
const movieRouter = express.Router();
const uuid = require('uuidv4');



const movies = [
    {id:"1", title: "Die Hard", genre: "action"},
    {id:"2", title: "Lord of the Rings", genre: "Sci Fi"},
    {id:"3", title: "A Long Kiss Goodnight", genre:"action"}
]


//get all localhost:8080/movies/
movieRouter.get('/', (req,res) => {
    console.log('in the movie route')
    res.json([movies]);
});


// get one localhost:8080/movies/01
movieRouter.get("/:movieId", (req,res, next) => {
    const movieId = req.params.movieId;
    const foundMovie = movies.find(movie => movie._id === movieId);
if (!foundMovie) {
    const error = new Error(`This item with the id of ${movieId} could not be found!`)
    res.status(500)
    return next(error)
}
return res.status(200).send(foundMovie); 
});


// get by genre localhost:8080/movies/search/genre/
movieRouter.get("/search/genre", (req, res, next) => {
    const genre = req.query.genre;
    if (!genre) {
        const error = new Error("You have to provide a movie genre!");
        res.send(500);
        return next(error);
    }
    const filterMovies = movies.filter(movie => movie.genre === genre);
    return res.status(200).send(filteredMovies);
});


// post one
movieRouter.post("/", (req, res, next) => {
    const newMovie = req.body;
    movies.push(newMovie);
    return res.status(201).send(newMovie);
});


module.exports = movieRouter;