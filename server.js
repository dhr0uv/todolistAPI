const express = require('express');
const sequelize = require('sequelize');
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const db = require('./models/dbCon');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes.js');

const PORT = 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

db.sequelize.sync({ alter: true, match: /todolist$/ }).then(() => {
  console.log('db has been synced');
}).catch((err) => {
  console.log(err);
});

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Application is listening on port ${PORT}`);
});