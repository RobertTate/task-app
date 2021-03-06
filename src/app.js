require('./db/mongoose');
const express = require('express');
const { apiRouter } = require('./routes');

const app = express();

app.use(express.json());
app.use('/', apiRouter);

module.exports = app;
