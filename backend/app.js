const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
var cors = require('cors');

//Roads import//
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

//CORS to authorize actions from the port 3000//
app.use(cors())

//Parse application/json content-type requests//
app.use(bodyParser.json());

//Call models in database//
const db = require("./models");

//Save routers//
app.use('/api/upload', express.static(path.join(__dirname, 'upload')));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;