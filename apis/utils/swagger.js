const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'JustDoIt API',
      version: '1.0.0',
      description: 'just-do-it-project API',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          description: 'JWT Authorization',
          type: 'http',
          scheme: 'bearer',
          in: 'header',
          bearerFormat: 'JWT',
        },
      },
    },
    security: {
      bearerAuth: [],
    },
    persistAuthorization: true,
    host: 'localhost:8000',
  },
  apis: ['apis/routes/*.js'],
};
const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
