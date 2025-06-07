import { Router } from "express";
import { CrearPerfilController } from "../controllers/CrearPerfilController";
import { ObtenerPerfilesController } from "../controllers/ObtenerPerfilesController";
import { CrearPerfilValidator } from "../validators/CrearPerfilValidator";

const router = Router();

// Crear perfil
router.post("/perfil", 
    CrearPerfilValidator.validate,
    async (req, res) => {
        const controller = new CrearPerfilController();
        await controller.ejecutar(req, res);
    }
);

// Obtener perfiles por suscriptor
router.get("/perfil/suscriptor/:suscriptorId", 
    async (req, res) => {
        const controller = new ObtenerPerfilesController();
        await controller.ejecutar(req, res);
    }
);

export default router;
