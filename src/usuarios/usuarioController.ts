import type { Request, Response } from "express";
import * as service from "./usuarioService";
import type {
  CreateUsuarioInput,
  UpdateUsuarioInput,
  LoginUsuarioInput, 
} from "./UsuarioSchema";
import {
  createUsuarioSchema,
  updateUsuarioSchema,
  loginUsuarioSchema, 
} from "./UsuarioSchema";
import jwt from "jsonwebtoken"; 

export const getAllUsuarios = async (_req: Request, res: Response) => {
  try {
    const usuarios = await service.getUsuarios();
    return res.json(usuarios);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const getUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id é obrigatório" });
    const usuario = await service.getUsuarioById(Number(id));
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
    const updated = await service.updateUsuario(Number(id), input);
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id é obrigatório" });
    await service.deleteUsuario(Number(id));
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginUsuarioSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ errors: parsed.error.format() });

    const { email, senha } = parsed.data;

    const usuario = await service.getUsuarioByEmail(email);
    if (!usuario)
      return res.status(401).json({ message: "Email ou senha inválidos" });

    
    const senhaValida = await service.validatePassword(senha, usuario.senha);
    if (!senhaValida)
      return res.status(401).json({ message: "Email ou senha inválidos" });

    
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "8h" } 
    );

    
    const { senha: _, ...usuarioSemSenha } = usuario;

    return res.json({
      message: "Login bem-sucedido",
      token,
      usuario: usuarioSemSenha,
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};