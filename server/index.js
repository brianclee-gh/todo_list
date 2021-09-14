const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

const app = express();
module.exports.app = app;

app.use(compression());
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/../dist/`));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})