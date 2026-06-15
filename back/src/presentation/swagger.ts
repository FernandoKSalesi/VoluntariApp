import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'VoluntariApp API',
      version: '1.0.0',
      description: 'API documentation for VoluntariApp',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT obtido no login.',
        },
      },
      schemas: {
        Category: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            description: { type: 'string' },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            cpf: { type: 'string' },
            username: { type: 'string' },
          },
        },
        Event: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            description: { type: 'string' },
            startTime: { type: 'string', format: 'date-time' },
            endTime: { type: 'string', format: 'date-time' },
            location: { type: 'string' },
            imageUrl: { type: 'string' },
            totalSpots: { type: 'integer' },
            organizerId: { type: 'integer' },
            categories: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  categoryId: { type: 'integer' },
                  category: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      name: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
        CreateUserDTO: {
          type: 'object',
          required: ['name', 'email', 'cpf', 'username', 'password'],
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            cpf: { type: 'string' },
            username: { type: 'string' },
            password: { type: 'string' },
          },
        },
        CreateEventDTO: {
          type: 'object',
          required: ['name', 'startTime', 'endTime', 'totalSpots'],
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            startTime: { type: 'string', format: 'date-time' },
            endTime: { type: 'string', format: 'date-time' },
            location: { type: 'string' },
            imageUrl: { type: 'string' },
            totalSpots: { type: 'integer' },
            categoryNames: {
              type: 'array',
              items: { type: 'string' },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/presentation/routes/*.ts'], // Path to the API docs
};

export const swaggerSpec = swaggerJsdoc(options);
