const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

router.post('/', 
    [
        check('name', 'The name is required').not().isEmpty()
    ],
    userController.createUser
)

router.get('/',
    userController.getUsers
)

router.put('/:id',
    [
        check('name', 'The name is required').not().isEmpty()
    ],
    userController.updateUser
)

router.delete('/:id',
    userController.deleteUser
)

module.exports = router;