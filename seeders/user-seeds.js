// Подключаем mongoose.
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/retouchme', { useNewUrlParser: true });

const User = require('../models/user');

const users = [
  {
    status: false,
    verified: true,
    admin: true,
    username: 'Админ',
    login: 'admin',
    email: 'admin@gmail.com',
    password: 'admin',
    tasks: [],
    completedTasks: [],
    rejectedTasks: [],
    info: 'инфо аккаунта админ',
  },
  {
    status: true,
    verified: true,
    admin: false,
    username: 'Ретушер с доступом и статусом Активен',
    login: 'user1',
    email: 'user1@gmail.com',
    password: 'user1',
    tasks: [],
    completedTasks: [],
    rejectedTasks: [],
    info: 'отличный ретушер, выполняет всё в срок',
  },
  {
    status: false,
    verified: true,
    admin: false,
    username: 'Ретушер с доступом и статусом НЕактивен',
    login: 'user2',
    email: 'user2@gmail.com',
    password: 'user2',
    tasks: [],
    completedTasks: [],
    rejectedTasks: [],
    info: 'ретушер, который получил доступ, но пока не желает брать заказы',
  },
  {
    status: false,
    verified: false,
    admin: false,
    username: 'Ретушер без доступа и статусом НЕктивен',
    login: 'user3',
    email: 'user3@gmail.com',
    password: 'user3',
    tasks: [],
    completedTasks: [],
    rejectedTasks: [],
    info: 'ретушер, который прошёл регистрацию, но ещё не проверен и не получил доступ к заказам',
  },
];

User.insertMany(users).then(() => {
  mongoose.connection.close();
});
