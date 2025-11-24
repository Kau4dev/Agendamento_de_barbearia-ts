import bcrypt from "bcryptjs";
import * as usuarioService from "../usuarios/usuarioService";


export const getUsuarioByEmail = async (email: string) => {
  return await usuarioService.getUsuarioByEmail(email);
};


export const validatePassword = async (
  senhaInput: string,
  senhaHash: string
) => {
  return await bcrypt.compare(senhaInput, senhaHash);
};