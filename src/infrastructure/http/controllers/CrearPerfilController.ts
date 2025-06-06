import { Request, Response } from "express";
import { CrearPerfil } from "../../../application/use-cases/CrearPerfil";
import { PerfilRepositoryImpl } from "../../../infrastructure/repositories/PerfilRepositoryImpl";

const perfilRepo = new PerfilRepositoryImpl();
const crearPerfilUseCase = new CrearPerfil(perfilRepo);

export class CrearPerfilController {
  static async ejecutar(req: Request, res: Response) {
    try {
      const { usuarioId, nombre, tipo, pin } = req.body;

      const perfilCreado = await crearPerfilUseCase.ejecutar({
        usuarioId,
        nombre,
        tipo,
        pin
      });

      res.status(201).json({
        id: perfilCreado.obtenerId(),
        nombre: perfilCreado.obtenerNombre(),
        tipo: perfilCreado.obtenerTipo(),
        restricciones: perfilCreado.tieneRestricciones(),
        pin: perfilCreado.obtenerPIN() ?? null
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
