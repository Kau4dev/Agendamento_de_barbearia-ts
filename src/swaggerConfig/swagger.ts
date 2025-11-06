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
    // REMOVEMOS os 'tags' e 'components/schemas' daqui
    // para deixar os arquivos *Router.ts cuidarem disso.
  },
  // ESTA É A LINHA MAIS IMPORTANTE:
  // Só vai ler os arquivos que terminam com Router.ts
  apis: ["./src/**/*Router.ts"],
};

// Gera a especificação
const swaggerSpec = swaggerJSDoc(options);

/**
 * Exporta a função que configura o Swagger UI.
 */
export const swaggerDocs = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};