import type { Request, Response } from "express";
import * as service from "./authService";
import { loginUsuarioSchema } from "./authSchema";
import { createUsuarioSchema } from "../usuarios/UsuarioSchema";
import * as usuarioService from "../usuarios/usuarioService";
import jwt from "jsonwebtoken";

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
      { expiresIn: "1h" }
    );

    const { senha: _, ...usuarioSemSenha } = usuario;

    return res.json({
      message: "Login bem-sucedido",
      token,
      usuario: usuarioSemSenha,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const parsed = createUsuarioSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ errors: parsed.error.format() });

    const { nome, email, senha, telefone } = parsed.data;

    // Verificar se o usuário já existe
    const usuarioExistente = await service.getUsuarioByEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    // Criar o usuário
    const novoUsuario = await usuarioService.createUsuario({
      nome,
      email,
      senha,
      telefone,
    });

    // Gerar token
    const token = jwt.sign(
      { id: novoUsuario.id, email: novoUsuario.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    const { senha: _, ...usuarioSemSenha } = novoUsuario;

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      token,
      usuario: usuarioSemSenha,
    });
  } catch (error) {
    console.error("Erro no registro:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};
