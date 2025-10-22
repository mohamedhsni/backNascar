const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'User API',
            version: '1.0.0',
            description: 'API documentation for the User management system',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
              {
                url: 'https://backnascar.onrender.com',
                description: 'Development server',
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to the API routes
};

module.exports = swaggerJsDoc(swaggerOptions);