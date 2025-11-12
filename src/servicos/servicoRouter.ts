import { Router } from "express";
import { ServicoController } from "./servicoController";
import { authMiddleware } from "../middlewares/authMiddleware";

const servicoRouter = Router();

servicoRouter.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Serviços
 *   description: Gerenciamento de serviços
 */

/**
 * @swagger
 * /servicos:
 *   post:
 *     summary: Cria um novo serviço
 *     tags: [Serviços]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/ServicoInput'
 *             example:
 *               nome: "Corte Masculino"
 *               descricao: "Corte de cabelo padrão"
 *               preco: 50
 *               duracao: 30
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servico'
 *             example:
 *               id: 1
 *               nome: "Corte Masculino"
 *               descricao: "Corte de cabelo padrão"
 *               preco: 50
 *               duracao: 30
 *               createdAt: "2025-10-05T12:00:00.000Z"
 *               updatedAt: "2025-10-05T12:00:00.000Z"
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
servicoRouter.post("/", ServicoController.create);

/**
 * @swagger
 * /servicos:
 *   get:
 *     summary: Lista todos os serviços
 *     tags: [Serviços]
 *     responses:
 *       200:
 *         description: Lista de serviços retornada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
servicoRouter.get("/", ServicoController.findAll);

/**
 * @swagger
 * /servicos/{id}:
 *   get:
 *     summary: Busca um serviço pelo ID
 *     tags: [Serviços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do serviço
 *     responses:
 *       200:
 *         description: Serviço encontrado
 *       404:
 *         description: Serviço não encontrado
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro interno do servidor
 */
servicoRouter.get("/:id", ServicoController.findById);

/**
 * @swagger
 * /servicos/{id}:
 *   put:
 *     summary: Atualiza um serviço existente
 *     tags: [Serviços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do serviço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServicoInput'
 *           example:
 *             nome: "Corte Atualizado"
 *             descricao: "Corte de cabelo atualizado"
 *             preco: 60
 *             duracao: 40
 *     responses:
 *       200:
 *         description: Serviço atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servico'
 *             example:
 *               id: 1
 *               nome: "Corte Atualizado"
 *               descricao: "Corte de cabelo atualizado"
 *               preco: 60
 *               duracao: 40
 *               createdAt: "2025-10-05T12:00:00.000Z"
 *               updatedAt: "2025-10-05T12:00:00.000Z"
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Serviço não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
servicoRouter.put("/:id", ServicoController.update);

/**
 * @swagger
 * /servicos/{id}:
 *   delete:
 *     summary: Remove um serviço
 *     tags: [Serviços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do serviço
 *     responses:
 *       204:
 *         description: Serviço removido com sucesso
 *       404:
 *         description: Serviço não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
servicoRouter.delete("/:id", ServicoController.delete);
/**
 * @swagger
 * components:
 *   schemas:
 *     ServicoInput:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: "Corte Masculino"
 *         descricao:
 *           type: string
 *           example: "Corte de cabelo padrão"
 *         preco:
 *           type: number
 *           example: 50
 *         duracao:
 *           type: integer
 *           example: 30
 *     Servico:
 *       allOf:
 *         - $ref: '#/components/schemas/ServicoInput'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             createdAt:
 *               type: string
 *               format: date-time
 *               example: "2025-10-05T12:00:00.000Z"
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               example: "2025-10-05T12:10:00.000Z"
 */

export default servicoRouter;
