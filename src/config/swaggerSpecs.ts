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
        url: 'http://localhost:5000/api/v1',
        description: 'Development'
      },
      {
        url: `${config.HOST ?? 'http://localhost:5000'}/api/v1`,
        description: 'Production'
      }
    ]
  },
  apis: ['./src/docs/*.ts']
};

const specs = swaggerJsDoc(options);

export default specs;
