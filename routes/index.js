
const createError = require('http-errors');
const express = require('express');
const fs = require('fs');
const indexRouter = express.Router();
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

/* GET: домашняя страница */
indexRouter.get('/', function(req, res, next) {
    res.sendFile('index.html', { root: '.' });
});

/* POST: получение данных формы */
indexRouter.post('/ticket', function (req, res, next) {
    const { name, surname, sex, dateBegin, dateEnd,
            gym, pool, spa, address, comment } = req.body;
    const mp3File = req.file;

    // проверка указанного пола
    if (!sex) {
        return next(createError(400, 'Необходимо указать пол!'));
    }
    // проверка указанных дат
    if (dateBegin > dateEnd) {
        return next(createError(400, 'Дата начала действия абонемента не может быть позже ' +
            'даты его завершения!'));
    }
    // проверка указанных услуг
    if (!gym && !pool && !spa) return next(createError(400, 'Необходимо указать минимум одну услугу!'));

    // форматирование списка услуг
    const benefits = [gym, pool, spa].map(item => item === undefined ? 0 : 1);

    const mp3Name = mp3File === undefined ? 'отсутствует' : mp3File.originalname;
    const commentText = comment === '' ? 'отсутствует' : comment;

    const content = `Имя: ${name}\nФамилия: ${surname}\nПол: ${sex}\nНачало: ${dateBegin}
Завершение: ${dateEnd}\nУслуги: ${[gym, pool, spa]}\nАдрес: ${address}\nФайл: ${mp3Name}\nКомментарий: ${commentText}\n`;

    fs.writeFile('bin/ticket.txt', content, (err) => {
        if (err) return next(createError(500, 'Ошибка сохранения данных!' ));
        db_pool.query("INSERT INTO tickets (name, surname, sex, dateBegin, dateEnd, address, gym, pool, spa) VALUES (?,?,?,?,?,?,?,?,?)",
            [name, surname, sex, dateBegin, dateEnd, address, benefits[0], benefits[1], benefits[2]], function (err, data) {
                if (err) {
                    console.error(err);
                    return next(createError(500, 'Ошибка сохранения записи в базе данных!'))
                }
        });
        res.render('preview', {
            clientName: name,
            clientSurname: surname,
            clientSex: sex,
            fitAddress: address,
            fitDateBegin: dateBegin,
            fitDateEnd: dateEnd,
            selectedGym: benefits[0],
            selectedPool: benefits[1],
            selectedSpa: benefits[2]
        });
    });
});

/* GET: файл с данными */
indexRouter.get('/file_info', function (req, res, next) {
    const filePath = 'bin/ticket.txt';
    let fileLastModified;

    // проверка файла на наличие
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) return next(createError(404, 'Файл не найден!'));
        const fileStats = fs.statSync(filePath);
        // получение времени последнего изменения файла
        fileLastModified = fileStats.mtime.toLocaleString('ru-RU', {
            day: 'numeric', month: 'long', year: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric'
        });
    });
    // проверка файла на доступ к чтению
    fs.readFile(filePath, (err, data) => {
        if (err) return next(createError(403, 'Файл не доступен для чтения!'));
        res.render('info', {
            fileName: filePath,
            fileLastModified: fileLastModified,
            fileData: data
        });
    });
});

module.exports = indexRouter;
