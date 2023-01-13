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
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Test Server In Local',
      },
      {
        url: 'http://3.36.93.92:8000',
        description: 'API Documentation in EC2',
      },
    ],
  },
  apis: ['apis/routes/*.js'],
};
const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
