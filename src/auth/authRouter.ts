import { Router } from "express";
import { login } from "./authController";

const authRouter = Router();

authRouter.post("/login", login);

export default authRouter;
