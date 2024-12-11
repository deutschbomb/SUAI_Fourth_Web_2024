
const createError = require('http-errors');
const express = require('express');
const databaseRouter = express.Router();
const mysql = require('mysql2');

// создание связи с БД
const db_pool = mysql.createPool({
    database: "ticketdb",
    password: "68923071",
    connectionLimit: 5,
    port: "3306",
    host: "localhost",
    user: "root",
});

/* GET: база абонементов  */
databaseRouter.get('/', function(req, res, next) {
    db_pool.query("SELECT * FROM tickets", function (err, data) {
       if (err) {
           console.error(err);
           return next(createError(500, 'Ошибка при получении данных!'));
       }
       res.render('database', { tickets: data });
    });
});

/* POST: обновление записи в базе данных */
databaseRouter.post('/edit', function (req, res, next) {
    const { name, surname, sex, dateBegin, dateEnd,
        gym, pool, spa, address, id } = req.body;

    // форматирование списка услуг
    const benefits = [gym, pool, spa].map(item => item === undefined ? 0 : 1);

    db_pool.query("UPDATE tickets SET name=?, surname=?, sex=?, dateBegin=?, dateEnd=?, address=?, gym=?, pool=?, spa=? WHERE idtickets=?",
        [name, surname, sex, dateBegin, dateEnd, address, benefits[0], benefits[1], benefits[2], id], function (err, data) {
            if (err) {
                console.error(err);
                return next(createError(500, 'Ошибка обновления записи в базе данных!'));
            }
            res.redirect('/database');
        });
});

/* POST: удаление записи из базы данных */
databaseRouter.post('/delete/:id', function (req, res, next) {
    const id = req.params.id;
    db_pool.query("DELETE FROM tickets WHERE idtickets=?", [id], function (err, data) {
        if (err) {
            console.error(err);
            return next(createError(500, 'Ошибка удаления записи из базы данных!'));
        }
        res.redirect('/database');
    })
});

/* GET: страница редактирования записи в базе данных */
databaseRouter.get(`/edit/:id`, function (req, res, next) {
    const id = req.params.id;
    db_pool.query("SELECT * FROM tickets WHERE idtickets=?", [id], function (err, data) {
       if (err) {
           console.error(err);
           return next(createError(500, 'Ошибка получения данных абонемента!'));
       }
       res.render('edit', { ticket: data[0] });
    });
});

/* GET: страница просмотра записи в базе данных */
databaseRouter.get(`/preview/:id`, function (req, res, next) {
    const id = req.params.id;
    db_pool.query("SELECT * FROM tickets WHERE idtickets=?", [id], function (err, data) {
        if (err) {
            console.error(err);
            return next(createError(500, 'Ошибка получения данных абонемента!'));
        }
        res.render('previewDB', { ticket: data[0] });
    });
});


module.exports = databaseRouter;
