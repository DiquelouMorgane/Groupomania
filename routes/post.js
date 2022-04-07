//Imports//
const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middlewares/authToken");
const authAdmin = require("../middlewares/authAdmin");
const multer = require("../middlewares/multer");

//Posts actions roads//
router.post("/", multer, postCtrl.createPost)
router.get("/", auth, postCtrl.getAllPosts)
router.delete("/", auth, authAdmin, postCtrl.deletePost)

module.exports = router;