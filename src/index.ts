import express, { json } from "express";
import corsMiddleware from "./config/cors";
import { usuarioRouter } from "./usuarios/usuarioRouter";
import { barbeiroRouter } from "./barbeiros/barbeiroRouter";
import { clienteRouter } from "./clientes/clienteRouter";
import servicoRouter from "./servicos/servicoRouter";
import agendaRouter from "./agenda/agendaRouter";
import agendamentoRouter from "./agendamentos/agendamentoRouter";
import { authRouter } from "./auth/authRouter";
import { dashboardRouter } from "./dashboard/dashboardRouter";
import notificacoesRouter from "./notificacoes/notificacoesRouter";
// import { swaggerDocs } from "./swaggerConfig/swagger"; // Temporariamente desabilitado
import { errorHandler } from "./middlewares/errorHandler";
import { authenticateToken } from "./middlewares/authMiddleware";

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração de CORS
app.use(corsMiddleware);

app.use(json());

// Rotas públicas (sem autenticação)
app.use("/auth", authRouter);

// Rotas protegidas (requerem autenticação JWT)
app.use("/usuarios", authenticateToken, usuarioRouter);
app.use("/clientes", authenticateToken, clienteRouter);
app.use("/servicos", authenticateToken, servicoRouter);
app.use("/agendamentos", authenticateToken, agendamentoRouter);
app.use("/barbeiros", authenticateToken, barbeiroRouter);
app.use("/agendas", authenticateToken, agendaRouter);
app.use("/dashboard", authenticateToken, dashboardRouter);
app.use("/notificacoes", authenticateToken, notificacoesRouter);

// swaggerDocs(app);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  // console.log(`📚 Swagger documentation available at http://localhost:${PORT}/api-docs`);
});
