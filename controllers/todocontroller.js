const { QueryTypes } = require('sequelize');
const db = require('../models/dbCon');

const Todo = db.todoModel;

const createTask = async (req, res) => {
  try {
    const { title, description, completionStatus, userId } = req.body;
    const data = {
      title,
      description,
      completionStatus,
      userId,
    }
    const task = await Todo.create(data);
    if (task) {
      return res.status(201).send('Task Created successfully');
    } else {
      return res.status(409).send('Invalid Credentials');
    }

  } catch (err) {
    console.log(err);
  }
};

const fetchAll = async (req, res) => {
  try {
    const todoList = await Todo.findAll({ include: ["users"] })
    return res.json(todoList);
  } catch (err) {
    console.log(err);
  }
};

const updateTask = async (req, res) => {
  try {
    const todoId = req.params.id;
    const value = await Todo.update(req.body, {
      where: {
        id: todoId,
      }
    })
    if (value) {
      const todo = await Todo.findOne({
        where: {
          id: todoId,
        }
      })
      return res.json(todo);
    } else {
      return res.status(404).send('Not Updated');
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteTask = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = await Todo.findOne({
      where: {
        id: todoId
      }
    });
    if (todo) {
      await Todo.destroy({
        where: {
          id: todoId
        }
      });
      return res.status(200).send('Successfully deleted');
    } else {
      return res.status(500).send('Task not found');
    }
  } catch (err) {
    console.log(err);
  }
};

const selectData = async (req, res) => {
  const users = await db.sequelize.query('SELECT * FROM "todolist"', { type: QueryTypes.SELECT });
  return res.json(users);

};

module.exports = {
  createTask,
  fetchAll,
  updateTask,
  deleteTask,
  selectData,
}
