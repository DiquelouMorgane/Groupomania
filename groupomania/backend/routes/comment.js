//Imports//
const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');

//Comments actions roads//
router.get('/', commentCtrl.findAllComments);
router.get('/:id', commentCtrl.findOneComment);
router.post('/', commentCtrl.createComment);
router.put('/:id', postCtrl.modifyComment);
router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;