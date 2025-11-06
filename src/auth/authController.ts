import type { Request, Response } from "express";
import * as service from "./authService";
import { loginUsuarioSchema } from "./authSchema";
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