import { Router } from "express";
import { getDashboardData } from "./dashboardController";
import { authMiddleware } from "../middlewares/authMiddleware";

const dashboardRouter = Router();

dashboardRouter.get("/", authMiddleware, getDashboardData);

export default dashboardRouter;
