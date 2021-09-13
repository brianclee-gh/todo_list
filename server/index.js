import express, { static } from 'express';
import compression from 'compression';
import morgan from 'morgan';
import path from 'path';

const app = express();
module.exports.app = app;

app.use(compression());
app.use(morgan('dev'));
app.use(static(`${__dirname}/../dist/index.html`));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})