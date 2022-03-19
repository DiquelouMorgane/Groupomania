//Imports//
const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');

//Posts actions roads//
router.get('/', auth, postCtrl.findAllPosts);
router.get('/:id', auth, postCtrl.findOnePost);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;