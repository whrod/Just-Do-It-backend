const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      openapi: '3.0.0',
      title: 'JustDoIt API',
      version: '1.0.0',
      description: 'just-do-it-project API',
    },
    host: 'localhost:8000',
    basePath: '/',
  },
  apis: ['apis/routes/*.js'],
};
const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
