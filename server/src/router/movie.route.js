const express = require("express");
const {
    addMovie,
    getAllMovie,
    editMovie,
    deleteMovie,
    getMovieDetail,
    getPaginateMovie,
    getMovieByLanguages,
    getLanguages,
    getGenres,
    booking,
} = require("../controller/movie.controller");
const uploadImage = require("../middleware/update-image");
const { verifyToken } = require("../middleware/verify-token");
const authorize = require("../middleware/authorize");
const movieRoute = express.Router();

/**
 * @method GET
 * @route /api/movie
 * @access Private
 */
movieRoute.get("/", getAllMovie);

/**
 * @method GET
 * @route /api/movie/:page/:size
 * @access Private
 */
movieRoute.get("/paginate", getPaginateMovie);

/**
 * @method GET
 * @route /api/movie/languages
 * @access Private
 */
movieRoute.get("/languages", getMovieByLanguages);

/**
 * @method GET
 * @route /api/movie/category/languages
 * @access Private
 */
movieRoute.get("/category/languages", getLanguages);

/**
 * @method GET
 * @route /api/movie/category/genres
 * @access Private
 */
movieRoute.get("/category/genres", getGenres);

/**
 * @method GET
 * @route /api/movie/:id
 * @access Private
 */
movieRoute.get("/:id", getMovieDetail);

/**
 * @method POST
 * @route /api/movie/booking
 * @access Private
 */
movieRoute.post("/booking", verifyToken, booking);

/**
 * @method POST
 * @route /api/movie
 * @access Private
 */
movieRoute.post("/", verifyToken, authorize(["ADMIN"]), uploadImage("file"), addMovie);
/**
 * @method PUT
 * @route /api/movie/:id
 * @access Private
 */
movieRoute.put("/:id", verifyToken, authorize(["ADMIN"]), editMovie);
/**
 * @method DELETE
 * @route /api/movie/:id
 * @access Private
 */
movieRoute.delete("/:id", verifyToken, authorize(["ADMIN"]), deleteMovie);

module.exports = movieRoute;