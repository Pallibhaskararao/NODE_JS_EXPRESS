const express = require("express");
const moviesControler = require("./../controlers/moviesControlers");
const router = express.Router();

router.route("/top-movies").get(moviesControler.getTopMovies,moviesControler.getMovies);

router.route("/movie-stats").get(moviesControler.getStats);
router.route("/generes-releted").get(moviesControler.getGeneres);

router.route("/")
        .get(moviesControler.getMovies)
        .post(moviesControler.createMovie)
router.route("/:id")
        .get(moviesControler.getMovie)
        .delete(moviesControler.deleteMovie)
        .patch(moviesControler.updateMovie)

        
module.exports = router;