//Imports//
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');

//Users actions roads//
router.get('/', auth, userCtrl.getAllUser);
router.get('/:id', auth, userCtrl.getOneUser);
router.put('/:id', auth, multer, userCtrl.modifyUser);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;