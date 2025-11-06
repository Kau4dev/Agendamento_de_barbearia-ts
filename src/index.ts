import express, { json } from "express";
import cors from "cors";
import { usuarioRouter } from "./usuarios/usuarioRouter";
import { barbeiroRouter } from "./barbeiros/barbeiroRouter";
import servicoRouter from "./servicos/servicoRouter";
import agendaRouter from "./agenda/agendaRouter";
import agendamentoRouter from "./agendamentos/agendamentoRouter";
import { authRouter } from "./auth/authRouter";
import { swaggerDocs } from "./swaggerConfig/swagger"; // <--- MUDANÇA AQUI (era setupSwagger)
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/usuarios", usuarioRouter);
app.use("/servicos", servicoRouter);
app.use("/agendamentos", agendamentoRouter);
app.use("/barbeiros", barbeiroRouter);
app.use("/agendas", agendaRouter);

swaggerDocs(app); // <--- MUDANÇA AQUI (era setupSwagger)

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(
    `📚 Swagger documentation available at http://localhost:${PORT}/api-docs`
  );
});