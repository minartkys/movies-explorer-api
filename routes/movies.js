const router = require('express').Router();
const { addMovieValid, delMovieValid } = require('../middlewares/validations');
const {
  getMovies,
  deleteMovieById,
  createMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', addMovieValid, createMovie);

router.delete('/movies/:movieId', delMovieValid, deleteMovieById);

module.exports = router;
