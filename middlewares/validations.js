const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const checkValidUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message('Невалидный url');
};

const authValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
  }),
});

const regValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const addMovieValid = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(100),
    director: Joi.string().required().min(2).max(100),
    duration: Joi.number().required().min(1).max(1000),
    year: Joi.string().required().min(2).max(4),
    description: Joi.string().required().min(1).max(50000),
    image: Joi.string().required().custom(checkValidUrl),
    trailerLink: Joi.string().required().custom(checkValidUrl),
    thumbnail: Joi.string().required().custom(checkValidUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().min(1).max(300),
    nameEN: Joi.string().required().min(1).max(300),
  }),
});

const delMovieValid = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
});

const updateUserValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().min(2).max(30).email(),
  }),
});

module.exports = {
  authValid,
  regValid,
  addMovieValid,
  delMovieValid,
  updateUserValid,
};
