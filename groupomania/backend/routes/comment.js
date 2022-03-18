//Imports//
const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');

//Comments actions roads//
router.get('/', auth, commentCtrl.findAllComments);
router.get('/:id', auth, commentCtrl.findOneComment);
router.post('/', auth, commentCtrl.createComment);
router.put('/:id', auth, postCtrl.modifyComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;