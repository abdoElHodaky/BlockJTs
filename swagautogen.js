const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./dist/routes.js'];

const config = {
    info: {
        title: 'BlockChain API Documentation',
        description: '',
    },
    tags: [
        {
            name:"Block",
            description:""
        }
        ,{
            name:"Explorer"
        }
    ],
    host: '',
    schemes: [],
};

swaggerAutogen(outputFile, endpointsFiles, config);
