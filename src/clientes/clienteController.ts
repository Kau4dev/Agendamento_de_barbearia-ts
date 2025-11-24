import type { Request, Response } from "express";
import * as service from "./clienteService";
import type { CreateClienteInput, UpdateClienteInput } from "./clienteSchema";
import { createClienteSchema, updateClienteSchema } from "./clienteSchema";

export const getAllClientes = async (_req: Request, res: Response) => {
  try {
    const clientes = await service.getClientes();
    return res.json(clientes);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const getCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id é obrigatório" });
    const cliente = await service.getClienteById(Number(id));
    if (!cliente)
      return res.status(404).json({ message: "Cliente não encontrado" });
    return res.json(cliente);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const createCliente = async (req: Request, res: Response) => {
  try {
    const parsed = createClienteSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ errors: parsed.error.format() });
    const input: CreateClienteInput = parsed.data;
    const created = await service.createCliente(input);
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const updateCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id é obrigatório" });
    const parsed = updateClienteSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ errors: parsed.error.format() });
    const input: UpdateClienteInput = parsed.data;
    const updated = await service.updateCliente(Number(id), input);
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const deleteCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id é obrigatório" });
    await service.deleteCliente(Number(id));
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};
