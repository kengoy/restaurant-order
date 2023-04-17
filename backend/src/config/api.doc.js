const config = require('./config');

module.exports = {
  openapi: '3.0.0',
  info: {
    description: 'API spec for Restaurant Order System',
    version: '0.0.1',
    title: 'Restaurant Order System API Specification',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development Server',
    },
  ],
  paths: {
    '/api/v1/menu': {
      get: {
        tags: ['Data'],
        summary: 'Get menu data',
        description: 'Get menu data that has array of categories and items',
        operationId: 'getMenu',
        parameters: [],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/menu',
                },
              },
            },
          },
        },
      },
    },
    '/api/v1/image/{imageId}': {
      get: {
        tags: ['Data'],
        summary: 'Get image file',
        description: 'Get image file of a specified image id of item',
        operationId: 'getImage',
        parameters: [
          {
            name: 'imageId',
            description: 'Image id of item identified in the menu data',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              example: 'f3fbf57b118fa9',
            },
          },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'image/jpeg': {},
            },
          },
          404: {
            description: 'NOT FOUND',
            content: {
              'application/json': {},
            },
          },
        },
      },
    },
    '/api/v1/order': {
      post: {
        tags: ['Data'],
        summary: 'Place order',
        description: 'Place an order with items and total price',
        operationId: 'order',
        parameters: [
          {
            name: 'items',
            description: 'Item list of',
            in: 'query',
            required: true,
            schema: {
              type: 'array',
              $ref: '#/components/schemas/order',
              example: [
                {
                  id: 1,
                  amount: 1,
                },
                {
                  id: 3,
                  amount: 2,
                },
                {
                  id: 7,
                  amount: 4,
                },
              ],
            },
          },
          {
            name: 'totalPrice',
            description: 'Total price of the order',
            in: 'query',
            schema: {
              type: 'number',
              example: 22.5,
            },
          },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/orderResponse',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      menu: {
        type: 'object',
        properties: {
          categories: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                  example: 1,
                },
                image_id: {
                  type: 'string',
                  example: 'f3fbf57b118fa9',
                },
                name: {
                  type: 'string',
                  example: 'Bakery',
                },
              },
            },
          },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                category_id: {
                  type: 'integer',
                  example: 5,
                },
                id: {
                  type: 'integer',
                  example: 3,
                },
                image_id: {
                  type: 'string',
                  example: '293202f9d9f7f4',
                },
                name: {
                  type: 'string',
                  example: 'Croissant',
                },
                price: {
                  type: 'integer',
                  example: 2.5,
                },
              },
            },
          },
        },
      },
      image: {
        type: 'file',
      },
      order: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                  example: 7,
                },
                amount: {
                  type: 'integer',
                  example: 3,
                },
              },
            },
          },
          totalPrice: {
            type: 'number',
            example: 22.5,
          },
        },
      },
      orderResponse: {
        type: 'object',
        properties: {
          order: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                example: 101,
              },
              time: {
                type: 'string',
                format: 'date-time',
                example: '2023-04-17T20:57:33.099Z',
              },
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                      example: 7,
                    },
                    amount: {
                      type: 'integer',
                      example: 3,
                    },
                  },
                },
              },
              totalPrice: {
                type: 'number',
                example: 22.5,
              },
            },
            example: {
              id: 101,
              time: '2023-04-17T20:57:33.099Z',
              items: [
                {
                  id: 1,
                  amount: 1,
                },
                {
                  id: 3,
                  amount: 2,
                },
              ],
              totalPrice: 22.5,
            },
          },
        },
      },
    },
  },
};
