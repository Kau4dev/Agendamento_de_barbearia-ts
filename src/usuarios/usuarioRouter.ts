import express from "express";
import {
  getAllUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "./usuarioController.js";

export const usuarioRouter = express.Router();

usuarioRouter.get("/", getAllUsuarios);
usuarioRouter.get("/:id", getUsuario);
usuarioRouter.post("/", createUsuario);
usuarioRouter.put("/:id", updateUsuario);
usuarioRouter.delete("/:id", deleteUsuario);
