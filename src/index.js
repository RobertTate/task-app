require('dotenv').config();
const express = require('express');
const { apiRouter } = require('./routes');

const app = express();

app.use(express.json());
app.use('/', apiRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
  require('./db/mongoose');
});
