
const createError = require('http-errors');
const express = require('express');
const fs = require('fs');
const router = express.Router();
const sql = require('../mysql/pool');

/* GET: выбор пользовательских параметров  */
router.get('/', function (req, res) {
    res.render('login');
});

/* POST: сохранение пользовательских параметров  */
router.post('/login', function(req, res, next) {
    req.session.userName = req.body.name;
    if (req.files.bg) {
        req.session.image = req.files.bg[0].originalname
        fs.unlink(req.files.bg[0].path, (err) => {
            if (err) console.error(err);
        });
    }

    res.redirect('table');
});

/* GET: просмотр таблицы базы данных */
router.get('/table', function (req, res, next) {
    const SQL_req = `SELECT * FROM tickets`;

    sql.query(SQL_req, function (err, data) {
        if (err) {
            console.error(err);
            return next(createError(500, 'Ошибка при получении данных!'));
        }
        res.render('database', {
            userName: req.session.userName,
            userBg: req.session.image,
            tickets: data
        });
    });
});

/* POST: обновление записи в базе данных */
router.post('/table/edit', function (req, res, next) {
    const { name, surname, sex, dateBegin, dateEnd,
        gym, pool, spa, address, id } = req.body;
    const SQL_req = `UPDATE tickets
        SET name=?, surname=?, sex=?, dateBegin=?, dateEnd=?, address=?, gym=?, pool=?, spa=?
        WHERE idtickets=?`;

    // форматирование списка услуг
    const benefits = [gym, pool, spa].map(item => item === undefined ? 0 : 1);

    const SQL_params = [name, surname, sex, dateBegin, dateEnd, address,
        benefits[0], benefits[1], benefits[2], id];

    sql.query(SQL_req, SQL_params, function (err, data) {
        if (err) {
            console.error(err);
            return next(createError(500, 'Ошибка обновления записи в базе данных!'));
        }
        res.redirect('/database/table');
    });
});

/* POST: удаление записи из базы данных */
router.post('/table/delete/:id', function (req, res, next) {
    const id = req.params.id;
    const SQL_req = `DELETE FROM tickets WHERE idtickets=?`;
    const SQL_param = [id];

    sql.query(SQL_req, SQL_param, function (err, data) {
        if (err) {
            console.error(err);
            return next(createError(500, 'Ошибка удаления записи из базы данных!'));
        }
        res.redirect('/database/table');
    })
});

/* GET: страница редактирования записи в базе данных */
router.get(`/table/edit/:id`, function (req, res, next) {
    const id = req.params.id;
    const SQL_req = `SELECT * FROM tickets WHERE idtickets=?`;
    const SQL_param = [id];

    sql.query(SQL_req, SQL_param, function (err, data) {
       if (err) {
           console.error(err);
           return next(createError(500, 'Ошибка получения данных абонемента!'));
       }
       res.render('edit', {
           userName: req.session.userName,
           userBg: req.session.image,
           ticket: data[0]
       });
    });
});

/* GET: страница просмотра записи в базе данных */
router.get(`/table/preview/:id`, function (req, res, next) {
    const id = req.params.id;
    const SQL_req = `SELECT * FROM tickets WHERE idtickets=?`;
    const SQL_param = [id];

    sql.query(SQL_req, SQL_param, function (err, data) {
        if (err) {
            console.error(err);
            return next(createError(500, 'Ошибка получения данных абонемента!'));
        }
        res.render('previewDB', {
            userName: req.session.userName,
            userBg: req.session.image,
            ticket: data[0]
        });
    });
});

module.exports = router;
