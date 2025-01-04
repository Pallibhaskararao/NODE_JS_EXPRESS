const express = require("express");
const moviesControler = require("./../controlers/moviesControlers");
const router = express.Router();

router.route("/")
        .get(moviesControler.getMovies)
        .post(moviesControler.createMovie)
router.route("/:id")
        .get(moviesControler.getMovie)
        .delete(moviesControler.deleteMovie)
        .patch(moviesControler.updateMovie)

module.exports = router;