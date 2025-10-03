import type { Request, Response } from "express";
import * as service from "./usuarioService.js";
import type {
  CreateUsuarioInput,
  UpdateUsuarioInput,
} from "./UsuarioSchema.js";
import { createUsuarioSchema, updateUsuarioSchema } from "./UsuarioSchema.js";

export const getAllUsuarios = async (_req: Request, res: Response) => {
  const usuarios = await service.getUsuarios();
  return res.json(usuarios);
};

export const getUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id é obrigatório" });
    const usuario = await service.getUsuarioById(id);
    if (!usuario)
      return res.status(404).json({ message: "Usuário não encontrado" });
    return res.json(usuario);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const createUsuario = async (req: Request, res: Response) => {
  try {
    const parsed = createUsuarioSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ errors: parsed.error.format() });
    const input: CreateUsuarioInput = parsed.data;
    const created = await service.createUsuario(input);
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const updateUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id é obrigatório" });
    const parsed = updateUsuarioSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ errors: parsed.error.format() });
    const input: UpdateUsuarioInput = parsed.data;
    const updated = await service.updateUsuario(id, input);
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id é obrigatório" });
    await service.deleteUsuario(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};
