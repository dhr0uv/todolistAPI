const express = require('express');
const todoController = require('../controllers/todocontroller');
const userAuth = require('../middleware/verifyToken');


const router = express.Router();


router.post('/create', todoController.createTask);
router.get('/fetch', todoController.fetchAll);
router.put('/update/:id', todoController.updateTask);
router.delete('/delete/:id', todoController.deleteTask);
router.get('/getall', todoController.selectData);

module.exports = router;