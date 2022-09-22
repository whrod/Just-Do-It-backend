require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./apis/routes');
const { globalErrorHandler } = require('./apis/utils/error');

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(routes);

app.all('*', (req, res, next) => {
  const err = new Error(`Can't fine ${req.originalUrl} on this server!`);

  err.statusCode = 404;

  res.status(statusCode).send();
  next(err);
});
app.use(globalErrorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening to request on 127.0.0.1:${PORT}`);
});
