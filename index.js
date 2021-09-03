const http = require('http');
const express = require('express');
var app = express();
const port = 4000;
var user = require('./routes/routes');//define rotes

const db = require('./util/mongo-connection');//intialise mongoDb connection
db.initDB();

app.use('/api/route', user);

var server = http.createServer(app).listen(port, function () {
    console.log('server listening on port ' + port);
});

module.exports = app;