import type { Request, Response } from "express";
import * as service from "./barbeiroService";
import type {
  createBarbeiroInput,
  UpdateBarbeiroInput,
} from "./barbeiroSchema";
import { createBarbeiroSchema, updateBarbeiroSchema } from "./barbeiroSchema";

export const getAllBarbeiros = async (_req: Request, res: Response) => {
  try {
    const barbeiros = await service.getBarbeiros();
    return res.json(barbeiros);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const getBarbeiro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id é obrigatório" });
    const barbeiro = await service.getBarbeiroById(Number(id));
    if (!barbeiro)
      return res.status(404).json({ message: "Barbeiro não encontrado" });
    return res.json(barbeiro);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const createBarbeiro = async (req: Request, res: Response) => {
  try {
    const parsed = createBarbeiroSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ errors: parsed.error.format() });
    const input: createBarbeiroInput = parsed.data;
    const created = await service.createBarbeiro(input);
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const updateBarbeiro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id é obrigatório" });
    const parsed = updateBarbeiroSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ errors: parsed.error.format() });
    const input: UpdateBarbeiroInput = parsed.data;
    const updated = await service.updateBarbeiro(Number(id), input);
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const deleteBarbeiro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id é obrigatório" });
    await service.deleteBarbeiro(Number(id));
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};
