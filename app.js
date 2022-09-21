require('dotenv').config();

const express = require('express');
const cors = require('cors')
const morgan = require('morgan');

const routes= require('./apis/routes');
const { globalErrorHandler } = require('./apis/utils/error');

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(routes);
app.use(globalErrorHandler);

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Listening to request on 127.0.0.1:${PORT}`);
});