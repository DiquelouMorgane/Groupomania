//Imports//
const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const multer = require('../middlewares/multer');

//Comments actions roads//
router.get('/', auth, commentCtrl.findAllComments);
router.get('/:id', auth, commentCtrl.findOneComment);
router.post('/', auth, multer, commentCtrl.createComment);
router.put('/:id', auth, multer, postCtrl.modifyComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;