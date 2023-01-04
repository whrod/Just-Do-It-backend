require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./apis/routes');
const { swaggerUi, specs } = require('./apis/utils/swagger');
const { globalErrorHandler } = require('./apis/utils/error');

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.all('*', (req, res, next) => {
  const error = new Error(`Can't fine ${req.originalUrl} on this server!`);
  error.statusCode = 404;

  next(error);
});
app.use(globalErrorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening to request on Port:${PORT}`);
});
