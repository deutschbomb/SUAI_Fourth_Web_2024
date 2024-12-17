
// импорт библиотек
const createError = require('http-errors'),
      express = require('express'),
      path = require('path'),
      logger = require('morgan'),
      multer = require('multer'),
      cookie = require('cookie-parser'),
      session = require('express-session');

// маршрутизаторы
const indexRouter = require('./routes/index'),
      databaseRouter = require('./routes/database');

const app = express();
const secret = 'labwork5';

// установка движка представлений
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// промежуточные библиотеки
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));  // обработка статических файлов
app.use(multer({ dest: 'uploads' }).fields(
    [
        { name: 'mp3', maxCount: 1 },
        { name: 'bg', maxCount: 1 },
    ]
));
app.use(cookie(secret));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secret,
}));

app.use('/', indexRouter);
app.use('/database', databaseRouter);

// ответ на 404
app.use(function(req, res, next) {
    next(createError(404, 'Страница не найдена'));
});

// обработка ошибок
app.use(function(err, req, res) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
