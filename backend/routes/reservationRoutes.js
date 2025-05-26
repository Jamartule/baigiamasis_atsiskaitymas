const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.get('/', reservationController.getAll);
router.post('/', reservationController.create);
router.get('/:id', reservationController.getById);
router.put('/:id', reservationController.update);
router.delete('/:id', reservationController.delete);

module.exports = router;
