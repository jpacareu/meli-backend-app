const express = require('express');
const items = require('../routes/items');
const error = require('../middleware/error');
const cors = require('cors')


const corsOptions = {
    origin: 'http://localhost:3000'
}

module.exports = function(app) {
	app.use(cors(corsOptions));
	app.use(express.json());

	app.use('/api/items', items);

	app.use(error);
};
