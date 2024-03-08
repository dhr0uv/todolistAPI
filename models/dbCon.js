const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./user');
const todoModel = require('./todo');

const sequelize = new Sequelize(`postgres://postgres:31102000@localhost:5432/todolist`, { dialect: 'postgres' });

const connection = async (sequelize) => {
  try {
    await sequelize.authenticate();
    console.log('Database Connected Successfully');
  } catch (err) {
    console.log('Unable to Connect', err);
  }
}
connection(sequelize);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.userModel = userModel(sequelize, DataTypes);
db.todoModel = todoModel(sequelize, DataTypes);

db.userModel.hasMany(db.todoModel, { as: "todolist" });
db.todoModel.belongsTo(db.userModel, {
  foreignKey: "userId",
  as: "users",
});

module.exports = db;
























/*
// server.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Todo } = require('./models'); // Your Sequelize models

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Register route
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user in the database
    const newUser = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Authenticate user
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Protected route (fetch todos)
app.get('/api/todos', (req, res) => {
  // Middleware verifies token before reaching here
  // Fetch todos from the database
  Todo.findAll().then((todos) => {
    res.status(200).json(todos);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// middleware/auth.js

const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization; // Assuming token is sent in the Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token missing' });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, 'your-secret-key');
    req.userId = decoded.userId; // Attach user ID to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = verifyToken;

// routes/todos.js

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth'); // Import the middleware

// Protected route: Fetch todos
router.get('/api/todos', verifyToken, (req, res) => {
  // Middleware has already verified the token
  // Fetch todos from the database and respond
  // req.userId contains the authenticated user's ID
  // ...
  res.status(200).json({ message: 'Fetching todos' });
});

module.exports = router;

// routes/todos.js

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth'); // Import the JWT verification middleware
const { Todo } = require('../models'); // Import your Sequelize model for Todos

// Protected route: Delete a todo by ID
router.delete('/api/todos/:id', verifyToken, async (req, res) => {
  try {
    const todoId = req.params.id;
    const userId = req.userId; // Extracted from the verified token

    // Check if the todo exists and belongs to the authenticated user
    const todo = await Todo.findOne({ where: { id: todoId, userId } });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Delete the todo
    await todo.destroy();
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

module.exports = router;



*/