const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 3000);
//Create a server with a request and a response//
const server = http.createServer(app);

//Listen to the port 3000 or a valid port//
server.listen(process.env.PORT || 3000);