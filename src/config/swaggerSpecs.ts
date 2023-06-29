import swaggerJsDoc from 'swagger-jsdoc';
import config from './config';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CHRod Movies API',
      version: '1.0.0',
      description: 'API developed with Node, Express, TypeScript and PostgreSQL.'
    },
    servers: [
      {
        url: `${config.HOST ?? 'http://localhost:5000'}/api/v1`
      }
    ]
  },
  apis: ['./src/docs/*.ts']
};

const specs = swaggerJsDoc(options);

export default specs;
