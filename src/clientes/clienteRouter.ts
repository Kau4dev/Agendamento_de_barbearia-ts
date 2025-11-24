import { Router } from "express";
import * as controller from "./clienteController";

export const clienteRouter = Router();

clienteRouter.get("/", controller.getAllClientes);
clienteRouter.get("/:id", controller.getCliente);
clienteRouter.post("/", controller.createCliente);
clienteRouter.put("/:id", controller.updateCliente);
clienteRouter.delete("/:id", controller.deleteCliente);
