
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "Blog API documentation and testing",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Local development server",
      },
    ],
  },
  apis: ["./src/modules/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
