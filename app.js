const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const error = require('./middlewares/error');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const { MONGO_URL } = require('./utils/config');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());

app.use(express.json());
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
});
app.use(requestLogger);
const allowedCors = [
  'http://localhost:3001',
  'http://localhost:3000',
  'https://minartkys.movie.nomoreparties.sbs/',
  'https://minartkys.movie.nomoreparties.sbs',
];
app.use(
  cors({
    origin: allowedCors,
  }),
);
app.use(routes);
app.use('*', (req, res, next) => next(new NotFoundError('404 Not Found')));
app.use(errorLogger);
app.use(helmet());
app.use(errors());
app.use(error);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
