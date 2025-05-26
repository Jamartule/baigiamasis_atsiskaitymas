const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:username', userController.getUserByUsername);
router.put('/:username', userController.updateUser);

module.exports = router;
