import { Router } from "express";
import { PerfilController } from "../controllers/PerfilController";

const router = Router();

router.post("/perfil", PerfilController.crearPerfil);

export default router;
