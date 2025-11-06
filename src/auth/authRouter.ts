import express from "express";
import { login } from "./authController";

export const authRouter = express.Router();

/**
 * @swagger
 * tags:
 * name: Autenticação
 * description: Autenticação de usuários
 */

/**
 * @swagger
 * /auth/login:
 * post:
 * summary: Autentica um usuário e retorna um token JWT
 * tags: [Autenticação]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * email:
 * type: string
 * example: "joao@email.com"
 * senha:
 * type: string
 * example: "Senha@123"
 * responses:
 * 200:
 * description: Login bem-sucedido
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: "Login bem-sucedido"
 * token:
 * type: string
 * example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * usuario:
 * $ref: '#/components/schemas/Usuario'
 * 400:
 * description: Dados inválidos
 * 401:
 * description: Email ou senha inválidos
 * 500:
 * description: Erro interno do servidor
 */
authRouter.post("/login", login);