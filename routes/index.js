
const createError = require('http-errors');
const express = require('express');
const fs = require('fs');
const router = express.Router();
const sql = require('../mysql/pool');

/* GET: первая страница формы */
router.get('/', function(req, res) {
    req.session.visitedPages = req.session.visitedPages || '';
    if (req.session.homeVisits) {
        req.session.homeVisits++;
    } else {
        req.session.homeVisits = 1;
    }
    req.session.visitedPages +=
        `${new Date().toLocaleString('ru-RU')}` + ' - \'' +
        `${req.path}` + '\' - ' +
        `${req.session.homeVisits}\n`;
    fs.writeFile('bin/visitedPages.txt', req.session.visitedPages, (err) => {
        if (err) console.log('Ошибка записи истории посещения');
    });

    res.render('index', {
        name: req.session.name || '',
        surname: req.session.surname || '',
        sex: req.session.sex || ''
    });
});

/* POST: получение данных первого шага */
router.post('/step1', function (req, res, next) {
    const { name, surname, sex } = req.body;

    // проверка указанного пола
    if (!sex) {
        return next(createError(400, 'Необходимо указать пол!'));
    }

    req.session.name = name;
    req.session.surname = surname;
    req.session.sex = sex;

    req.session.save();
    res.redirect('/step2');
});

/* GET: вторая страница формы */
router.get('/step2', function (req, res) {
    if (req.session.step2Visits) {
        req.session.step2Visits++;
    } else {
        req.session.step2Visits = 1;
    }
    req.session.visitedPages +=
        `${new Date().toLocaleString('ru-RU')}` + ' - \'' +
        `${req.path}` + '\' - ' +
        `${req.session.step2Visits}\n`;
    fs.writeFile('bin/visitedPages.txt', req.session.visitedPages, (err) => {
        if (err) console.log('Ошибка записи истории посещения');
    });

    res.render('index2', {
        dateBegin: req.session.dateBegin || '',
        dateEnd: req.session.dateEnd || ''
    });
});

/* POST: получение данных второго шага */
router.post('/step2', function (req, res, next) {
    const { dateBegin, dateEnd } = req.body;

    // проверка указанных дат
    if (dateBegin > dateEnd) {
        return next(createError(400, 'Дата начала действия абонемента не может быть позже ' +
            'даты его завершения!'));
    }

    req.session.dateBegin = dateBegin;
    req.session.dateEnd = dateEnd;
    res.redirect('/step3');
});

/* GET: третья страница формы */
router.get('/step3', function (req, res) {
    if (req.session.step3Visits) {
        req.session.step3Visits++;
    } else {
        req.session.step3Visits = 1;
    }
    req.session.visitedPages +=
        `${new Date().toLocaleString('ru-RU')}` + ' - \'' +
        `${req.path}` + '\' - ' +
        `${req.session.step3Visits}\n`;
    fs.writeFile('bin/visitedPages.txt', req.session.visitedPages, (err) => {
        if (err) console.log('Ошибка записи истории посещения');
    });

    res.render('index3', {
        gym: req.session.gym || '',
        pool: req.session.pool || '',
        spa: req.session.spa || '',
        address: req.session.address || '',
    });
});

/* POST: получение данных третьего шага и сохранение формы */
router.post('/step3', function (req, res, next) {
    const { gym, pool, spa, address, comment } = req.body;
    const mp3File = req.files.mp3[0];

    // проверка указанных услуг
    if (!gym && !pool && !spa) return next(createError(400, 'Необходимо указать минимум одну услугу!'));

    // форматирование списка услуг
    req.session.gym = gym === undefined ? 0 : 1;
    req.session.pool = pool === undefined ? 0 : 1;
    req.session.spa = spa === undefined ? 0 : 1;

    req.session.mp3 = mp3File === undefined ? 'отсутствует' : mp3File.originalname;
    req.session.comment = comment === '' ? 'отсутствует' : comment;
    req.session.address = address;

    const content = `Имя: ${req.session.name}\nФамилия: ${req.session.surname}
Пол: ${req.session.sex}\nНачало: ${req.session.dateBegin}\nЗавершение: ${req.session.dateEnd}
Услуги: ${[gym, pool, spa]}\nАдрес: ${req.session.address}\nФайл: ${req.session.mp3}
Комментарий: ${req.session.comment}\n`;

    fs.writeFile('bin/ticket.txt', content, (err) => {
        if (err) return next(createError(500, 'Ошибка сохранения данных!' ));
        const SQL_req = `INSERT INTO tickets
            (name, surname, sex, dateBegin, dateEnd, address, gym, pool, spa) VALUES (?,?,?,?,?,?,?,?,?)`;
        const SQL_params = [req.session.name, req.session.surname, req.session.sex,
            req.session.dateBegin, req.session.dateEnd, req.session.address,
            req.session.gym, req.session.pool, req.session.spa];

        sql.query(SQL_req, SQL_params, function (err, data) {
            if (err) {
                console.error(err);
                return next(createError(500, 'Ошибка сохранения записи в базе данных!'))
            }
        });
        res.render('preview', {
            clientName: req.session.name,
            clientSurname: req.session.surname,
            clientSex: req.session.sex,
            fitAddress: req.session.address,
            fitDateBegin: req.session.dateBegin,
            fitDateEnd: req.session.dateEnd,
            selectedGym: req.session.gym,
            selectedPool: req.session.pool,
            selectedSpa: req.session.spa
        });
    });
});

/* GET: файл с данными */
router.get('/file_info', function (req, res, next) {
    if (req.session.file_infoVisits) {
        req.session.file_infoVisits++;
    } else {
        req.session.file_infoVisits = 1;
    }
    req.session.visitedPages +=
        `${new Date().toLocaleString('ru-RU')}` + ' - \'' +
        `${req.path}` + '\' - ' +
        `${req.session.file_infoVisits}\n`;
    fs.writeFile('bin/visitedPages.txt', req.session.visitedPages, (err) => {
        if (err) console.log('Ошибка записи истории посещения');
    });

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

module.exports = router;
