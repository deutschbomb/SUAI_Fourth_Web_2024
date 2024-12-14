# Дисциплина: WEB-ПРОГРАММИРОВАНИЕ
### ГУАП, четвёртый курс - I семестр, 2024 г.
________________________________________________________________________________________________________________________________________________________________

Целью дисциплины является получение навыков в области ***Web-программирования*** (разработка *серверной* части). В рамках изучения дисциплины были получены навыки обработки данных HTML-форм, работа с файлами и базой данных, работа с сессиями и файлами cookie в среде `Node.JS`.

#### Технологии, использованные при разработке проекта:
- платформа [![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](https://github.com/nodejs/node)
- библиотека [![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)](https://github.com/expressjs/express)
- шаблонизатор [![Pug (Jade)](https://img.shields.io/badge/Pug-A86454?logo=pug&logoColor=fff)](https://github.com/pugjs/pug)
- реляционная система управления базами данных [![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=fff)](https://www.mysql.com/)
- библиотека **[Multer](https://github.com/expressjs/multer)**
- библиотека **[MySQL2](https://github.com/sidorares/node-mysql2)**
- библиотека **[express-session](https://github.com/expressjs/session)**

Проект представляет собой веб-страницу с формой оформления абонемента в фитнес-клуба и страницы для управления базой данных абонементов.
Для отправки заявки оформления абонемента пользователь указывает свои имя и фамилию, пол, дату начала и завершения посещения зала, желаемые услуги, адрес клуба, а также опционально может добавить файл с музыкальной композицией для тренировки и оставить комментарий. Полученный данные из формы отправляются на сервер, записываются в файл и добавляются в новую запись базы данных, а также выводятся пользователю на новой странице.

Страница для управления базой данных поддерживает все операции взаимодействия:
- просмотр как всех записей, так и каждой по отдельности;
- изменение выбранной записи;
- удаление выбранной записи.

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
