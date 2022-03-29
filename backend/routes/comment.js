//Imports//
const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middlewares/authToken');
const authAdmin = require("../middlewares/authAdmin");

//Comments actions roads//
router.post("/", auth, commentCtrl.createComment)
router.delete("/", auth, authAdmin, commentCtrl.deleteComment)

module.exports = router;