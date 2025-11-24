import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const port = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Agendamento de Barbearia",
      version: "1.0.0",
      description: "Documentação da API de agendamento de barbearia",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Servidor local",
      },
    ],

    
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",       
          scheme: "bearer",     
          bearerFormat: "JWT", 
        },
      },
    },
    
  },

  
  apis: ["./src/**/*Router.ts", "./src/**/*Schema.ts"],
};


const swaggerSpec = swaggerJSDoc(options);


export const swaggerDocs = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};