
// импорт библиотек
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const multer = require('multer');

// маршрутизаторы
const indexRouter = require('./routes/index');
const databaseRouter = require('./routes/database');

const app = express();

// установка движка представлений
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// промежуточные библиотеки
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));  // обработка статических файлов
app.use(multer({ dest: 'uploads' }).single('mp3'))

app.use('/', indexRouter);
app.use('/database', databaseRouter);

// ответ на 404
app.use(function(req, res, next) {
  next(createError(404, 'Страница не найдена'));
});

// обработка ошибок
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
