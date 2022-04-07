//Imports//
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const auth = require('../middlewares/authToken');

//Users actions roads//
router.put("/", auth, userCtrl.updateUser)
router.delete("/", auth, userCtrl.deleteUser)

module.exports = router;