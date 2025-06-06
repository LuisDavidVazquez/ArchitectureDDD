import { Request, Response } from "express";
import { CreatePerfil } from "../../../application/use-cases/CreatePerfil";
import { PerfilRepositoryImpl } from "../../repositories/PerfilRepositoryImpl";

const perfilRepo = new PerfilRepositoryImpl();
const createPerfilUseCase = new CreatePerfil(perfilRepo);

export class PerfilController {
  static async crearPerfil(req: Request, res: Response) {
    try {
      const { usuarioId, nombre, tipo, pin } = req.body;

      await createPerfilUseCase.ejecutar({
        usuarioId,
        nombre,
        tipo,
        pin
      });

      res.status(201).json({ mensaje: "Perfil creado exitosamente." });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
