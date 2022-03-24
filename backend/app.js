const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

//Roads import//
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

//CORS to authorize actions from the port 3000//
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    if (req.method === 'OPTIONS') {
      res.send(200);
    }
    else {
      next();
    }
  });

//Parse application/json content-type requests//
app.use(bodyParser.json());

//Call models in database//
const db = require("./models");
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

//Save routers//
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;