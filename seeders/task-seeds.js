// Подключаем mongoose.
const mongoose = require("mongoose");
const faker = require("faker");

mongoose.connect("mongodb://localhost:27017/retouchme", {
  useNewUrlParser: true
});

const Task = require("../models/task");

const tasks = [
  {
    status: false,
    approved: true,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments:
      "Нужна ретушь и коллажирование фото. Нужно обработать и частично склеить фото, сделать нужно до вечера.",
    amount: 100,
    cost: 1000,
    cltlink:
      "https://www.fl.ru/projects/4170511/nujna-retush-i-kollajirovanie-foto.html"
  },
  {
    status: false,
    approved: true,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments:
      "Желательно бы, чтобы было готово вчера, но если сегодня, то тоже ок",
    amount: 10,
    cost: 100,
    link: "https://www.fl.ru/.html"
  },
  {
    status: false,
    approved: true,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments: "Добрый день. Работа на пару часов",
    amount: 200,
    cost: 2000,
    link: "https://www.ya.ru"
  },
  {
    status: false,
    approved: false,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments:
      "Нужен ретушер, умеющий работать в технике частотного разложения. Задача – 30-40 фотографий с фотосессии",
    amount: 40,
    cost: 400,
    link: "https://www.fl.ru/.html"
  },
  {
    status: true,
    approved: true,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments: "50 фотографий.",
    amount: 500,
    cost: 5000,
    link: "https://www.fl.ru/projects/4170469/obrabotka-foto.html"
  },
  {
    status: true,
    approved: true,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments: "Выполнена - Нужна ретуш, срочно, 35 фотографий.",
    amount: 35,
    cost: 350,
    link: "https://www.fl.ru/projects/4170461"
  },
  {
    status: true,
    approved: true,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments: "Выполнена - Ретуш, 100 фотографий.",
    amount: 100,
    cost: 1000,
    link: "https://www.fl.ru/"
  },
  {
    status: false,
    approved: false,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments:
      "НЕ  - ретуш? А надо ли мне оно..я просто так зашёл на ваш сайт посмотреть",
    amount: 1,
    cost: 9999,
    link: "google.com"
  },
  {
    status: false,
    approved: false,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments: "spjihvonvpemlfd",
    amount: 1,
    cost: 9999,
    link: "noadress.com"
  },
  {
    status: false,
    approved: false,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments: "lalalalalalalalalalla",
    amount: 9999,
    cost: 1,
    link: "cltComments.cltComments"
  },
  {
    status: false,
    approved: false,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments:
      "Нужна ретушь и коллажирование фото. Нужно обработать и частично склеить фото, сделать нужно до вечера.",
    amount: 100,
    cost: 1000,
    link:
      "https://www.fl.ru/projects/4170511/nujna-retush-i-kollajirovanie-foto.html"
  },
  {
    status: false,
    approved: false,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments:
      "10 фото. Желательно бы, чтобы было готово вчера, но если сегодня, то тоже ок",
    amount: 10,
    cost: 100,
    link: "https://www.fl.ru/.html"
  },
  {
    status: false,
    approved: false,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments: "ретушь 200 фото. Добрый день. Работа на пару часов",
    amount: 200,
    cost: 2000,
    link: "https://www.ya.ru"
  },
  {
    status: false,
    approved: false,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments:
      "30-40 фото. Нужен ретушер, умеющий работать в технике частотного разложения. Задача – 30-40 фотографий с фотосессии",
    amount: 40,
    cost: 400,
    link: "https://www.fl.ru/.html"
  },
  {
    status: true,
    approved: true,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments: "Выполнена - ретуш, срочно. 50 фотографий.",
    amount: 500,
    cost: 5000,
    link: "https://www.fl.ru/projects/4170469/obrabotka-foto.html"
  },
  {
    status: true,
    approved: true,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments: "Выполнена - Нужна ретуш, срочно. 35 фотографий.",
    amount: 35,
    cost: 350,
    link: "https://www.fl.ru/projects/4170461"
  },
  {
    status: true,
    approved: true,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments: "Выполнена - Ретуш. 100 фотографий.",
    amount: 100,
    cost: 1000,
    link: "https://www.fl.ru/"
  },
  {
    status: false,
    approved: false,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments:
      "НЕ  - ретуш? А надо ли мне оно..я просто так зашёл на ваш сайт посмотреть",
    amount: 1,
    cost: 9999,
    link: "google.com"
  },
  {
    status: false,
    approved: false,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments: "spjihvonvpemlfd",
    amount: 1,
    cost: 9999,
    link: "noadress.com"
  },
  {
    status: false,
    approved: false,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments: "lalalalalalalalalalla",
    amount: 9999,
    cost: 1,
    link: "cltComments.cltComments"
  },
  {
    status: false,
    approved: false,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments:
      "Не выполнена и НЕ  - Нужна ретушь и коллажирование фото. Нужно обработать и частично склеить фото, сделать нужно до вечера.",
    amount: 100,
    cost: 1000,
    link:
      "https://www.fl.ru/projects/4170511/nujna-retush-i-kollajirovanie-foto.html"
  },
  {
    status: false,
    approved: false,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments:
      "Желательно бы, чтобы было готово вчера, но если сегодня, то тоже ок",
    amount: 10,
    cost: 100,
    link: "https://www.fl.ru/.html"
  },
  {
    status: false,
    approved: false,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments: "Добрый день. Работа на пару часов",
    amount: 200,
    cost: 2000,
    link: "https://www.ya.ru"
  },
  {
    status: false,
    approved: false,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments:
      "Нужен ретушер, умеющий работать в технике частотного разложения. Задача – 30-40 фотографий с фотосессии",
    amount: 40,
    cost: 400,
    link: "https://www.fl.ru/.html"
  },
  {
    status: true,
    approved: true,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments: "50 фотографий.",
    amount: 500,
    cost: 5000,
    link: "https://www.fl.ru/projects/4170469/obrabotka-foto.html"
  },
  {
    status: true,
    approved: true,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments: "35 фотографий.",
    amount: 35,
    cost: 350,
    link: "https://www.fl.ru/projects/4170461"
  },
  {
    status: true,
    approved: true,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments: "100 фотографий.",
    amount: 100,
    cost: 1000,
    link: "https://www.fl.ru/"
  },
  {
    status: false,
    approved: false,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments: "я просто так зашёл на ваш сайт посмотреть",
    amount: 1,
    cost: 9999,
    link: "google.com"
  },
  {
    status: false,
    approved: false,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments: "spjihvonvpemlfd",
    amount: 1,
    cost: 9999,
    link: "noadress.com"
  },
  {
    status: false,
    approved: false,
    inProgress: false,
    cltName: faker.name.findName(),
    cltEmail: faker.internet.email(),
    cltPhone: faker.phone.phoneNumber(),
    cltComments: "lalalalalalalalalalla",
    amount: 9999,
    cost: 1,
    link: "cltComments.cltComments"
  }
];

Task.insertMany(tasks).then(() => {
  mongoose.connection.close();
});
