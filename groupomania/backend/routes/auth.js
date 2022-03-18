//Imports//
const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');

//Authentification signup and login roads//
router.post('/signup', auth, authCtrl.signup);
router.post('/login', auth, authCtrl.login);

module.exports = router;