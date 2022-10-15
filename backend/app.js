const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const {
  celebrate, Joi, errors,
} = require('celebrate');

const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { login, createUser, logoff } = require('./controllers/users');

const { cors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');

const NotFound = require('./err/NotFound');

const regular = /(https?:\/\/)([www.]?[a-zA-Z0-9-]+\.)([^\s]{2,})/;

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regular),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/logoff', logoff);

app.use('/users', auth, userRoutes);
app.use('/cards', auth, cardRoutes);

app.use(errorLogger);

app.use(errors());

app.use('*', (req, res, next) => {
  next(new NotFound('Простите, страница не найдена'));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка сервера' : message });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
  console.log(process.env.JWT_SECRET);
  console.log(process.env.NODE_ENV);
});
