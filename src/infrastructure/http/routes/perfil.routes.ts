import { Router } from "express";
import { CrearPerfilController } from "../controllers/CrearPerfilController";
import { ObtenerPerfilesPorUsuarioController } from "../controllers/ObtenerPerfilesPorUsuarioController";

const router = Router();

router.post("/perfil", CrearPerfilController.ejecutar);
router.get("/perfil/:usuarioId", ObtenerPerfilesPorUsuarioController.ejecutar);

export default router;
