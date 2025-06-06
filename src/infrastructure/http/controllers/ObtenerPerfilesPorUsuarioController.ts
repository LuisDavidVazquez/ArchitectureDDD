import { Request, Response } from "express";
import { ObtenerPerfilesPorUsuario } from "../../../application/use-cases/ObtenerPerfilesPorUsuario";
import { PerfilRepositoryImpl } from "../../../infrastructure/repositories/PerfilRepositoryImpl";

const perfilRepo = new PerfilRepositoryImpl();
const getPerfilesUseCase = new ObtenerPerfilesPorUsuario(perfilRepo);

export class ObtenerPerfilesPorUsuarioController {
  static async ejecutar(req: Request, res: Response) {
    try {
      const { usuarioId } = req.params;

      const perfiles = await getPerfilesUseCase.ejecutar(usuarioId);

      res.status(200).json(
        perfiles.map(p => ({
          id: p.obtenerId(),
          nombre: p.obtenerNombre(),
          tipo: p.obtenerTipo(),
          restricciones: p.tieneRestricciones(),
          pin: p.obtenerPIN() ?? null
        }))
      );
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
