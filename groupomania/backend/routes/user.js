//Imports//
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const postCtrl = require('../controllers/post');

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');

//Users actions roads//
router.get('/', userCtrl.findAllUsers);
router.get('/:id', userCtrl.findOneUser);
router.put('/:id', multer, userCtrl.modifyUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;