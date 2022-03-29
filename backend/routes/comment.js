//Imports//
const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');

//Comments actions roads//
router.get('/', auth, commentCtrl.getAllComment);
router.get('/:id', auth, commentCtrl.getOneComment);
router.post('/', auth, multer, commentCtrl.createComment);
router.put('/:id', auth, multer, commentCtrl.modifyComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;