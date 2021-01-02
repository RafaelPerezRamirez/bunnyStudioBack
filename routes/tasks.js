const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const { check } = require('express-validator');

router.post('/', 
    [
        check('description', 'Descripton is required').not().isEmpty()
    ],
    tasksController.createTask
)

router.get('/',
    [
        check('userId', 'userId is required').not().isEmpty()
    ],
    tasksController.getTasks
)

router.put('/:id',
    tasksController.updateTask
)

router.delete('/:id',
    tasksController.deleteTask
)
module.exports = router;