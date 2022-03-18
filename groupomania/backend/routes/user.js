//Imports//
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const postCtrl = require('../controllers/post');

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');

//Users actions roads//
router.get('/', auth, userCtrl.findAllUsers);
router.get('/:id', auth, userCtrl.findOneUser);
router.put('/:id', auth, multer, userCtrl.modifyUser);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;