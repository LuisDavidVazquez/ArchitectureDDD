import express from "express";
import perfilRoutes from "./src/infrastructure/http/routes/perfil.routes";  

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", perfilRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
