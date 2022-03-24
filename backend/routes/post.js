//Imports//
const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');

//Posts actions roads//
router.get('/', auth, postCtrl.getAllPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;