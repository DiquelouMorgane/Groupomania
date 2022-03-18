//Imports//
const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');
const auth = require('../middlewares/auth');

//Posts actions roads//
router.get('/', postCtrl.findAllPosts);
router.get('/:id', postCtrl.findOnePost);
router.post('/', postCtrl.createPost);
router.put('/:id', postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;