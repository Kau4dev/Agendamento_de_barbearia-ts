import express from "express";
import { json } from "express";
import { usuarioRouter } from "./usuarios/usuarioRouter";
import { barbeiroRouter } from "./barbeiros/barbeiroRouter";
import servicoRouter from "./servicos/servicoRouter";
import agendaRouter from "./agenda/agendaRouter";
import agendamentoRouter from "./agendamentos/agendamentoRouter";
import { setupSwagger } from "./swaggerConfig/swagger";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());

app.use("/usuarios", usuarioRouter);
app.use("/servicos", servicoRouter);
app.use("/agendamentos", agendamentoRouter);
app.use("/barbeiros", barbeiroRouter);
app.use("/agendas", agendaRouter);
setupSwagger(app);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(
    `📚 Swagger documentation available at http://localhost:${PORT}/api-docs`
  );
});
