const winston = require('winston');
const express = require('express');
const app = express();
const path = require('path');
const favicon = require('express-favicon');

require('./startup/logging')();
require('./startup/routes')(app);

app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 4000;
const server = app.listen(port, () =>
	winston.info(`Listening on port ${port}...`)
);

module.exports = server;
