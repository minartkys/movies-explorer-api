const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  deleteMovieById,
  createMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post(
  '/movies',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required().min(2).max(50),
      director: Joi.string().required().min(2).max(50),
      duration: Joi.number().required().min(1).max(1000),
      year: Joi.string().required().min(2).max(4),
      description: Joi.string().required().min(1).max(5000),
      image: Joi.string()
        .required()
        .pattern(
          /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
        ),
      trailerLink: Joi.string()
        .required()
        .pattern(
          /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
        ),
      thumbnail: Joi.string()
        .required()
        .pattern(
          /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
        ),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required().min(1).max(100),
      nameEN: Joi.string().required().min(1).max(100),
    }),
  }),
  createMovie,
);

router.delete(
  '/movies/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex(),
    }),
  }),
  deleteMovieById,
);

module.exports = router;
